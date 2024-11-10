import properties from '../data/properties.js';

document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('.search-form');
    const propertyGrid = document.querySelector('.property-grid');
    let currentProperties = [...properties];

    // 物件表示関数
    function displayProperties(properties) {
        propertyGrid.innerHTML = '';
        properties.forEach(property => {
            const card = `
                <div class="property-card">
                    <div class="property-image">
                        <img src="${property.image}" alt="${property.title}">
                        <span class="property-type">${property.type}</span>
                    </div>
                    <div class="property-info">
                        <h4>${property.title}</h4>
                        <p class="price">¥${property.price.toLocaleString()}/月</p>
                        <p class="location">
                            <i class="fas fa-map-marker-alt"></i> ${property.location}
                        </p>
                        <p class="station">
                            <i class="fas fa-train"></i> ${property.station}駅 徒歩${property.walkTime}分
                        </p>
                        <div class="property-details">
                            <span><i class="fas fa-bed"></i> ${property.rooms}</span>
                            <span><i class="fas fa-ruler-combined"></i> ${property.size}m²</span>
                        </div>
                        <div class="features">
                            ${property.features.map(feature => 
                                `<span class="feature-tag">${feature}</span>`
                            ).join('')}
                        </div>
                        <button onclick="addToFavorite(${property.id})" class="favorite-btn">
                            <i class="far fa-heart"></i> お気に入り
                        </button>
                    </div>
                </div>
            `;
            propertyGrid.insertAdjacentHTML('beforeend', card);
        });
    }

    // 検索機能
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const area = document.querySelector('select[name="area"]').value;
        const minPrice = document.querySelector('input[name="minPrice"]').value;
        const maxPrice = document.querySelector('input[name="maxPrice"]').value;
        const rooms = document.querySelector('select[name="rooms"]').value;

        const filteredProperties = properties.filter(property => {
            if (area && !property.location.includes(area)) return false;
            if (minPrice && property.price < minPrice) return false;
            if (maxPrice && property.price > maxPrice) return false;
            if (rooms && property.rooms !== rooms) return false;
            return true;
        });

        displayProperties(filteredProperties);
    });

    // お気に入り機能
    window.addToFavorite = function(propertyId) {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (!favorites.includes(propertyId)) {
            favorites.push(propertyId);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            alert('お気に入りに追加しました！');
        } else {
            alert('すでにお気に入りに追加されています');
        }
    };

    // 初期表示
    displayProperties(properties);
});
