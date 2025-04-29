import items from "./data.json";

const communities = document.getElementById("communities");

const html = items
  .map((item) => {
    return `<article>
<span class="tag">${item.category}</span>
<h6>${item.name}</h6>
<b>${item.region}</b>
<article>
<p>${item.description}</p>
</article>
<article>
<a class="link" href="${item.website}" target="_blank">Website</a>
</article>
</article>`;
  })
  .join("");

communities.innerHTML = html;

async function getData(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return { error: null, data };
  } catch (error) {
    return { error: error.message, data: null };
  }
}
