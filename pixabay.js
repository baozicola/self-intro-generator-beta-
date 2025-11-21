// functions/api/pixabay.js

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  
  const query = url.searchParams.get('q');
  
  if (!query) {
    return new Response(JSON.stringify({ error: 'Missing query' }), { status: 400 });
  }

  const apiKey = env.PIXABAY_API_KEY; 
  
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Server Config Error: Key missing' }), { status: 500 });
  }

  try {

    const targetUrl = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&per_page=50&safesearch=true`;
    
    const response = await fetch(targetUrl);
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', 
        'Cache-Control': 'public, max-age=3600'
      },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}