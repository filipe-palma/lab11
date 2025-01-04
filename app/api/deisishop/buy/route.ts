
export async function POST (req: Request) {
    const body = await req.json()
    const resp = await fetch('https://deisishop.pythonanywhere.com/buy/', { 
        method: "POST",
        body: JSON.stringify(body),
    })

    if (!resp.ok) {
        return new Response(JSON.stringify({ error: resp.statusText }), { status: resp.status })
    }
    const data = await resp.json()
    if (data.hasOwnProperty("error")) {
        return new Response(JSON.stringify({ error: data.error }), { status: 500 })
    }
    return new Response(JSON.stringify(data))
}