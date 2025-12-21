// const express = require('express');
// const axios = require('axios');
// const Conversation = require('../models/Conversation');
// const { compareTwoStrings } = require('string-similarity');

// const router = express.Router();

// // Middleware to verify JWT (optional)
// const authenticate = (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');
//   if (!token) return res.status(401).json({ error: 'Access denied' });
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.id;
//     next();
//   } catch (error) {
//     res.status(401).json({ error: 'Invalid token' });
//   }
// };

// // Send message
// router.post('/send', async (req, res) => {
//   try {
//     const { userId, mode, language, message } = req.body;

//     // Find or create conversation
//     let conversation = await Conversation.findOne({ userId, mode, language }).sort({ createdAt: -1 });
//     if (!conversation) {
//       conversation = new Conversation({ userId, mode, language, messages: [] });
//     }

//     // Add user message
//     conversation.messages.push({ role: 'user', content: message });
//     await conversation.save();

//     // Generate AI response
//     const aiResponse = await generateResponse(mode, language, message, conversation.messages);

//     // Add AI response
//     conversation.messages.push({ role: 'assistant', content: aiResponse });
//     await conversation.save();

//     res.json({ response: aiResponse });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Function to generate response using Hugging Face
// async function generateResponse(mode, language, userMessage, history) {
//   const model = 'mistralai/Mistral-7B-Instruct-v0.1'; // or 'meta-llama/Llama-2-7b-chat-hf'
//   const apiKey = process.env.HUGGINGFACE_API_KEY;

//   let prompt = '';

//   if (mode === 'learning') {
//     prompt = `You are a language tutor. The user is practicing ${language}. Respond in ${language}. Detect mistakes in grammar or vocabulary. Correct one mistake at a time. Show corrected sentence first, then explain mistake in ONE short sentence. Give ONE pronunciation tip if applicable. Ask a short follow-up question. Friendly, encouraging tone. Keep responses short.

// User: ${userMessage}`;
//   } else {
//     prompt = `You are a friendly conversation partner. Respond ONLY in ${language}. Respond naturally without corrections. Use short, clear sentences. Ask short follow-up questions. Friendly, human-like, conversational.

// User: ${userMessage}`;
//   }

//   // Add history if needed
//   const fullPrompt = history.slice(-10).map(m => `${m.role}: ${m.content}`).join('\n') + '\n' + prompt;

//   const response = await axios.post(
//     `https://api-inference.huggingface.co/models/${model}`,
//     {
//       inputs: fullPrompt,
//       parameters: { max_new_tokens: 200, temperature: 0.7 },
//     },
//     {
//       headers: { Authorization: `Bearer ${apiKey}` },
//     }
//   );

//   return response.data[0].generated_text.trim();
// }

// module.exports = router;




























// const express = require('express');
// const axios = require('axios');
// const Conversation = require('../models/Conversation');

// const router = express.Router();

// router.post('/send', async (req, res) => {
//   try {
//     const { userId, mode, language, message } = req.body;
//     if (!userId || !mode || !language || !message) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     console.log("Request body:", req.body);

//     // Find or create conversation
//     let conversation = await Conversation.findOne({ userId, mode, language })
//       .sort({ createdAt: -1 });

//     if (!conversation) {
//       conversation = new Conversation({
//         userId,
//         mode,
//         language,
//         messages: []
//       });
//     }

//     // Save user message
//     conversation.messages.push({
//       role: 'user',
//       content: message
//     });
//     await conversation.save();

//     // ===== AI RESPONSE =====
//     let aiResponse = "Hello! This is a fallback response.";

//     try {
//       const prompt =
//         mode === 'learning'
//           ? `You are a language tutor. Respond in ${language}.
// User: ${message}
// Assistant:`
//           : `You are a friendly conversation partner.
// Respond only in ${language}.
// User: ${message}
// Assistant:`;

//      const response = await axios.post(
//   "https://router.huggingface.co/v1/chat/completions",
//   {
//     model: "openai/gpt-oss-20b",
//     messages: [
//       {
//         role: "system",
//         content:
//           mode === "learning"
//             ? `You are a language tutor. Respond in ${language}.`
//             : `You are a friendly conversation partner. Respond only in ${language}.`
//       },
//       {
//         role: "user",
//         content: message
//       }
//     ],
//     temperature: 0.7,
//     max_tokens: 120
//   },
//   {
//     headers: {
//       Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
//       "Content-Type": "application/json"
//     }
//   }
// );

// aiResponse = response.data.choices[0].message.content;
// aiResponse = aiResponse.replace(/[\u200B-\u200D\uFEFF]/g, ''); // حذف الرموز غير المرئية
// aiResponse = aiResponse.replace(/▁/g, ' '); // استبدال underscore بمسافة لو موجود


//     } catch (err) {
//       console.error("HF ERROR:", err.response?.data || err.message);
//     }

//     // Save AI message
//     conversation.messages.push({
//       role: 'assistant',
//       content: aiResponse
//     });
//     await conversation.save();

//     res.json({ response: aiResponse });

//   } catch (error) {
//     console.error("SERVER ERROR:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// module.exports = router;




























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

    // ===== إيجاد المحادثة الصحيحة =====
    let conversation;
    
    if (conversationId) {
      // إذا أرسل العميل معرف محادثة، استخدمه
      conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        return res.status(404).json({ error: 'Conversation not found' });
      }
    } else {
      // البحث عن المحادثة النشطة الأخيرة
      conversation = await Conversation.findOne({ 
        userId, 
        mode, 
        language,
        isActive: true 
      }).sort({ updatedAt: -1 });

      // إذا لم توجد محادثة نشطة، أنشئ واحدة جديدة
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

    // ===== حفظ رسالة المستخدم =====
    conversation.messages.push({
      role: 'user',
      content: message
    });

    // تحديث وقت التعديل
    conversation.updatedAt = Date.now();
    await conversation.save();

    // ===== إعداد الرسائل التاريخية للسياق =====
    let messagesForAI = [];
    
    // رسالة النظام بناءً على الوضع
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

    // إضافة الرسائل السابقة (السياق)
    // نأخذ آخر 10 رسائل كسياق
    const contextMessages = conversation.messages.slice(-10);
    contextMessages.forEach(msg => {
      messagesForAI.push({
        role: msg.role,
        content: msg.content
      });
    });

    // ===== الحصول على رد من الذكاء الاصطناعي =====
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
          timeout: 30000 // 30 ثانية timeout
        }
      );

      if (response.data.choices && response.data.choices[0]) {
        aiResponse = response.data.choices[0].message.content;
        // // تنظيف النص
        // aiResponse = aiResponse
        //   .replace(/[\u200B-\u200D\uFEFF]/g, '')
        //   .replace(/▁/g, ' ')
        //   .trim();
        
        // // إزالة أي نص تكراري
        // aiResponse = aiResponse.replace(/(.{10,}?)\1{2,}/g, '$1');



          // ===== تنظيف النص من الرموز =====
  aiResponse = aiResponse
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // حذف الرموز غير المرئية
    .replace(/▁/g, ' ') // استبدال underscore بمسافة
    // حذف الإيموجات والرموز الخاصة
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

    // ===== حفظ رد الذكاء الاصطناعي =====
    conversation.messages.push({
      role: 'assistant',
      content: aiResponse
    });
    
    conversation.updatedAt = Date.now();
    await conversation.save();

    // ===== إرسال الرد للعميل =====
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

// ===== نقطة نهاية جديدة: جلب محادثة معينة =====
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

// ===== نقطة نهاية: محادثات المستخدم =====
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

    // حساب عدد الرسائل لكل محادثة
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

// ===== نقطة نهاية: إنشاء محادثة جديدة =====
router.post('/new', async (req, res) => {
  try {
    const { userId, mode, language } = req.body;
    
    if (!userId || !mode || !language) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // تعطيل المحادثات القديمة النشطة
    await Conversation.updateMany(
      { userId, mode, language, isActive: true },
      { isActive: false, updatedAt: Date.now() }
    );

    // إنشاء محادثة جديدة
    const conversation = new Conversation({
      userId,
      mode,
      language,
      messages: [],
      isActive: true,
      title: `${mode === 'learning' ? 'Learning' : 'Chat'} in ${language} - ${new Date().toLocaleDateString()}`
    });

    // رسالة ترحيب أولية
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

// ===== نقطة نهاية: تحديث عنوان المحادثة =====
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

// ===== نقطة نهاية: حذف محادثة =====
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