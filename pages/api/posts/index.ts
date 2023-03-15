import type { NextApiRequest, NextApiResponse } from 'next';

async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    return res.json({ name: req.method })

  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" })
  }
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    return res.json({ name: req.method })

  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" })
  }
}

async function PUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    return res.json({ name: req.method })

  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" })
  }
}

async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    return res.json({ name: req.method })

  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" })
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    GET(req, res)

  } else if (req.method === "POST") {
    POST(req, res)

  } else if (req.method === "PUT") {
    PUT(req, res)

  } else if (req.method === "DELETE") {
    DELETE(req, res)
  }
}

export default handler