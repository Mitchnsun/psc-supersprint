const postHandler = async (req, res) => {
  const { firstname, lastname, bib, gender, category, times } = req.body
  return res.status(200).json({ firstname, lastname, bib, gender, category, times: { ...times, run: times.total - times.swim - times.bike } })
}

const handler = async (req, res) => {
  switch (req.method) {
    case 'POST':
      return postHandler(req, res)
    default:
      return res.status(501).json({ code: 'server/not-implemented' })
  }
}

export default handler