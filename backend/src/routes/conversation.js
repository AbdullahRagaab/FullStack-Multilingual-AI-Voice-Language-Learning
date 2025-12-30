const express = require('express');
const axios = require('axios');
const Conversation = require('../models/Conversation');

const router = express.Router();

router.post('/send', async (req, res) => {
  try {
    const { userId, mode, language, message, conversationId } = req.body;
    
    if (!userId || !mode || !language || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    console.log("Request body:", req.body);

    let conversation;
    
    if (conversationId) {
      conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        return res.status(404).json({ error: 'Conversation not found' });
      }
    } else {
      conversation = await Conversation.findOne({ 
        userId, 
        mode, 
        language,
        isActive: true 
      }).sort({ updatedAt: -1 });

      if (!conversation) {
        conversation = new Conversation({
          userId,
          mode,
          language,
          messages: [],
          isActive: true,
          title: `${mode === 'learning' ? 'Learning' : 'Conversation'} in ${language}`
        });
      }
    }

    conversation.messages.push({
      role: 'user',
      content: message
    });

    conversation.updatedAt = Date.now();
    await conversation.save();

    let messagesForAI = [];
    
    const systemMessage = {
      role: "system",
      content: mode === "learning" 
        ? `You are a language tutor. Always respond in ${language}. 
           Provide explanations, examples, and corrections.
           Maintain the conversation context and build upon previous discussions.
           Help the user improve their language skills.`
        : `You are a friendly conversation partner. Always respond in ${language}.
           Keep responses natural, engaging, and context-aware.
           Continue the conversation naturally based on previous messages.`
    };
    messagesForAI.push(systemMessage);

  
    const contextMessages = conversation.messages.slice(-10);
    contextMessages.forEach(msg => {
      messagesForAI.push({
        role: msg.role,
        content: msg.content
      });
    });

    let aiResponse = mode === 'learning' 
      ? `Let's continue our ${language} lesson!`
      : `Let's continue our conversation in ${language}!`;

    try {
      const response = await axios.post(
        "https://router.huggingface.co/v1/chat/completions",
        {
          model: "openai/gpt-oss-20b",
          messages: messagesForAI,
          temperature: mode === 'learning' ? 0.7 : 0.9,
          max_tokens: 150,
          top_p: 0.9,
          frequency_penalty: 0.5,
          presence_penalty: 0.5
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
            "Content-Type": "application/json"
          },
          timeout: 30000 
        }
      );

      if (response.data.choices && response.data.choices[0]) {
        aiResponse = response.data.choices[0].message.content;

  aiResponse = aiResponse
    .replace(/[\u200B-\u200D\uFEFF]/g, '') 
    .replace(/▁/g, ' ') 
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E0}-\u{1F1FF}]/gu, '')
    .replace(/[`~!@#$%^&*()_|+\=?;:'"<>\{\}\[\]\\\/]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

      }

    } catch (err) {
      console.error("HF API ERROR:", err.response?.data || err.message);
      aiResponse = mode === 'learning'
        ? `I'm here to continue helping you with ${language}. Could you repeat or rephrase that?`
        : `I'd love to continue our chat in ${language}. What were you saying?`;
    }

    conversation.messages.push({
      role: 'assistant',
      content: aiResponse
    });
    
    conversation.updatedAt = Date.now();
    await conversation.save();

    res.json({ 
      response: aiResponse, 
      conversationId: conversation._id,
      messageCount: conversation.messages.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).json({ 
      error: "Internal server error", 
      details: error.message,
      suggestion: "Please try again or start a new conversation"
    });
  }
});

router.get('/conversation/:conversationId', async (req, res) => {
  try {
    const { conversationId } = req.params;
    const conversation = await Conversation.findById(conversationId);
    
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    res.json({
      conversationId: conversation._id,
      mode: conversation.mode,
      language: conversation.language,
      title: conversation.title,
      messages: conversation.messages,
      createdAt: conversation.createdAt,
      updatedAt: conversation.updatedAt,
      isActive: conversation.isActive
    });

  } catch (error) {
    console.error("Error fetching conversation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get('/conversations/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { mode, language } = req.query;
    
    let query = { userId };
    if (mode) query.mode = mode;
    if (language) query.language = language;
    
    const conversations = await Conversation.find(query)
      .sort({ updatedAt: -1 })
      .select('_id mode language title createdAt updatedAt messageCount')
      .limit(20);

    const conversationsWithStats = conversations.map(conv => ({
      ...conv.toObject(),
      messageCount: conv.messages ? conv.messages.length : 0
    }));

    res.json(conversationsWithStats);

  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/new', async (req, res) => {
  try {
    const { userId, mode, language } = req.body;
    
    if (!userId || !mode || !language) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await Conversation.updateMany(
      { userId, mode, language, isActive: true },
      { isActive: false, updatedAt: Date.now() }
    );

    const conversation = new Conversation({
      userId,
      mode,
      language,
      messages: [],
      isActive: true,
      title: `${mode === 'learning' ? 'Learning' : 'Chat'} in ${language} - ${new Date().toLocaleDateString()}`
    });

    conversation.messages.push({
      role: 'assistant',
      content: mode === 'learning' 
        ? `Welcome to ${language} learning! I'm here to help you practice. What would you like to learn today?`
        : `Hello! Let's have a conversation in ${language}. How are you doing today?`
    });

    await conversation.save();

    res.json({ 
      conversationId: conversation._id,
      title: conversation.title,
      initialMessage: conversation.messages[0].content
    });

  } catch (error) {
    console.error("Error creating conversation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put('/conversation/:conversationId/title', async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { title } = req.body;
    
    if (!title || title.trim().length < 2) {
      return res.status(400).json({ error: 'Title must be at least 2 characters' });
    }

    const conversation = await Conversation.findByIdAndUpdate(
      conversationId,
      { 
        title: title.trim(),
        updatedAt: Date.now()
      },
      { new: true }
    );

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    res.json({ 
      conversationId: conversation._id,
      title: conversation.title,
      updatedAt: conversation.updatedAt
    });

  } catch (error) {
    console.error("Error updating conversation title:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete('/conversation/:conversationId', async (req, res) => {
  try {
    const { conversationId } = req.params;
    
    const conversation = await Conversation.findByIdAndDelete(conversationId);

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    res.json({ 
      success: true,
      message: 'Conversation deleted successfully',
      conversationId
    });

  } catch (error) {
    console.error("Error deleting conversation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;