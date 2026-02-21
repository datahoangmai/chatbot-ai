export default async function handler(req, res) {
  res.status(200).json({
    url: process.env.SUPABASE_URL
  })
}
