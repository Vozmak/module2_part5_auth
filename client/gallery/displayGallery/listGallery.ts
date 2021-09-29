// import { getPage } from './helpers/getPage';

if (!localStorage.token) window.location.href = '../index.html';

if (localStorage.timestamp < Date.now()) {
  localStorage.removeItem('token');
  localStorage.removeItem('timestamp');

  window.location.href = '../index.html';
}

const previous = document.querySelector('#previous') as HTMLButtonElement;
const next = document.querySelector('#next') as HTMLButtonElement;

// displayImgList()
//   .then( result => {
//   if (result) alert(result);
// }).catch(e => {
//   console.log(e);
// });

(async () => {
  try {
    await displayImgList();
  } catch (e) {
    console.log(e);
  }
})();

previous.onclick = function() {
  window.location.href = `gallery.html?page=${localStorage.page - 1}`
};

next.onclick = function() {
  window.location.href = `gallery.html?page=${Number(localStorage.page) + 1}`
};

async function displayImgList(): Promise<void> {
  const gallery = document.querySelector(".gallery") as HTMLBodyElement

  const searchParams = new URL(window.location.href).searchParams;
  const page: number | string = getPage();
  const limit = Number(searchParams.get('limit')) || localStorage.limit || '0';
  const filter = searchParams.get('filter') || '0';

  const imgList: Response = await fetch(`http://127.0.0.1:2000/gallery/${page}/${limit}/${filter}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.token}`
    }
  });

  if (imgList.status !== 200) {
    let error = await imgList.json();

    if (imgList.status === 401) {
      window.stop();
    } else {
      window.location.href = `gallery.html?page=${localStorage.page}`;
    }

    return alert(error.errorMessage);
  }

  const jsonImgList = await imgList.json();
  for (let img of jsonImgList.objects) {
    let newImg = document.createElement("img") as HTMLImageElement;
    newImg.src = new URL(img).toString();
    gallery.insertAdjacentElement("beforeend", newImg);
  }

  const div = document.querySelector(".page") as HTMLBodyElement;
  const p = div.querySelector("p") as HTMLElement;
  p.textContent = `Страница ${page} из ${jsonImgList.total}`;

  if (Number(page) === 1) previous.disabled = true
  else if (Number(page) === jsonImgList.total) next.disabled = true

  localStorage.setItem("page", page.toString());
  localStorage.setItem('limit', limit);
}

function getPage(): string {
  const searchParams = new URL(window.location.href).searchParams;
  return Number(searchParams.get('page')) || localStorage.page || 1;
}
