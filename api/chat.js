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

  const insertUser = await supabase
    .from('conversations')
    .insert({
      user_id,
      message,
      role: 'user'
    })

  if (insertUser.error) {
    return res.status(500).json({ error: insertUser.error })
  }

  const botReply = "Chào bạn 👋 tôi là chatbot AI"

  const insertBot = await supabase
    .from('conversations')
    .insert({
      user_id,
      message: botReply,
      role: 'assistant'
    })

  if (insertBot.error) {
    return res.status(500).json({ error: insertBot.error })
  }

  return res.status(200).json({
    reply: botReply
  })
}
