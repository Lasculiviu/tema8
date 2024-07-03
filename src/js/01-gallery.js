import { galleryItems } from './gallery-items';
// Change code below this line

//console.log(galleryItems);
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const listElement = document.querySelector('.gallery');
const photosMarkup = createGalleryItem(galleryItems);

function createGalleryItem(items) {
    return items
        .map(({ preview, original, description }) => {
            return `<a class='gallery_link' href="${original}">
                <img class="gallery_image" src="${preview}" alt="${description}"/>
            </a>`;
        })
        .join('');
}
 src = "https://cdnjs.cloudflare.com/ajax/libs/simplelightbox/2.10.0/simple-lightbox.min.js";
listElement.insertAdjacentHTML('beforeend', photosMarkup);

const galleryHandler = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

galleryHandler.on('show.simplelightbox');
