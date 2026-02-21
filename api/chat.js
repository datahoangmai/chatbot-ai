import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
)

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Only POST allowed" })
  }

  const { user_id, message } = req.body

  // Lưu message user
  await supabase.from('conversations').insert({
    user_id,
    message,
    role: 'user'
  })

  // Tạm thời trả lời mẫu
  const botReply = "Chào bạn 👋 tôi là chatbot AI"

  // Lưu message bot
  await supabase.from('conversations').insert({
    user_id,
    message: botReply,
    role: 'assistant'
  })

  return res.status(200).json({
    reply: botReply
  })
}
