export default function makeMarkupOfPhotoCards(photoItems) {
    return photoItems.map(item => {

        return `
        <div class="photo-card">
            <a href="${item.largeImageURL}" >
            <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" class="photo-card__img"/>
            </a>
            <div class="info">
                <p class="info-item">
                <b>Likes</b>
                ${item.likes}
                </p>
                <p class="info-item">
                <b>Views</b>
                ${item.views}
                </p>
                <p class="info-item">
                <b>Comments</b>
                ${item.comments}
                </p>
                <p class="info-item">
                <b>Downloads</b>
                ${item.downloads}
                </p>
            </div>
        </div>`
    }).join(' ');
}