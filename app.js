const imageContainer = document.querySelector('.image-container');
const imageList = document.querySelector('.image-list');
const loadingObserver = document.querySelector('.spinner');
const placeholder = document.querySelector('.placeholder');
const IMAGE_PER_PAGE = 3;
let page = 1;
let totalImageLoaded = 0;

const updateMonitor = () => {
  totalImageLoaded += 3;
  placeholder.innerText = totalImageLoaded;
};

const options = {
  root: imageContainer,
  rootMargin: '0px 0px 0px 0px',
  threshold: 0,
};

const fetchImages = () => {
  axios
    .get(`https://picsum.photos/v2/list?page=${page}&limit=${IMAGE_PER_PAGE}`)
    .then((res) => {
      res.data.forEach((image) => {
        imageList.innerHTML += `
          <li class="image-item"><img class="image" src=${image.download_url}></li>
        `;
      });
      page += 1;
      updateMonitor();
    });
};

const callback = ([entry]) => {
  if (entry && entry.isIntersecting) {
    fetchImages();
  }
};

let observer = new IntersectionObserver(callback, options);
observer.observe(loadingObserver);
