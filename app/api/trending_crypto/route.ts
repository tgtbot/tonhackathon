export async function POST(req: Request) {
  try {
    const response = await fetch("https://ai.tinalee.bot/trending_crypto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    return new Response(await response.text());
  } catch (error) {
    return Response.error();
  }
}
