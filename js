// 検索機能の実装
document.addEventListener('DOMContentLoaded', function() {
    // 検索フォームの取得
    const searchForm = document.querySelector('.search-form');
    const propertyGrid = document.querySelector('.property-grid');

    // サンプル物件データ
    const properties = [
        {
            id: 1,
            title: '駅近デザイナーズマンション',
            price: 95000,
            type: 'マンション',
            location: '東京都渋谷区',
            rooms: '1LDK',
            size: 35.5,
            image: '/api/placeholder/400/300'
        },
        {
            id: 2,
            title: '閑静な住宅街のアパート',
            price: 80000,
            type: 'アパート',
            location: '東京都世田谷区',
            rooms: '2K',
            size: 40.2,
            image: '/api/placeholder/400/300'
        },
        // 他の物件データ
    ];

    // 検索フォームのイベントリスナー
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // フォームの値を取得
        const area = searchForm.querySelector('select:nth-of-type(1)').value;
        const minPrice = searchForm.querySelector('input[type="number"]:nth-of-type(1)').value;
        const maxPrice = searchForm.querySelector('input[type="number"]:nth-of-type(2)').value;
        const rooms = searchForm.querySelector('select:nth-of-type(2)').value;

        // 物件をフィルタリング
        const filteredProperties = filterProperties(properties, {
            area,
            minPrice,
            maxPrice,
            rooms
        });

        // 結果を表示
        displayProperties(filteredProperties);
    });

    // 物件フィルタリング関数
    function filterProperties(properties, filters) {
        return properties.filter(property => {
            let matches = true;

            if (filters.area && filters.area !== '') {
                matches = matches && property.location.includes(filters.area);
            }

            if (filters.minPrice && filters.minPrice !== '') {
                matches = matches && property.price >= parseInt(filters.minPrice);
            }

            if (filters.maxPrice && filters.maxPrice !== '') {
                matches = matches && property.price <= parseInt(filters.maxPrice);
            }

            if (filters.rooms && filters.rooms !== '') {
                matches = matches && property.rooms === filters.rooms;
            }

            return matches;
        });
    }

    // 物件表示関数
    function displayProperties(properties) {
        propertyGrid.innerHTML = '';

        properties.forEach(property => {
            const propertyCard = createPropertyCard(property);
            propertyGrid.appendChild(propertyCard);
        });
    }

    // 物件カード作成関数
    function createPropertyCard(property) {
        const card = document.createElement('div');
        card.className = 'property-card';
        card.innerHTML = `
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}">
                <span class="property-type">${property.type}</span>
            </div>
            <div class="property-info">
                <h4>${property.title}</h4>
                <p class="price">¥${property.price.toLocaleString()}</p>
                <p class="location"><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
                <div class="property-details">
                    <span><i class="fas fa-bed"></i> ${property.rooms}</span>
                    <span><i class="fas fa-ruler-combined"></i> ${property.size}m²</span>
                </div>
                <button onclick="addToFavorite(${property.id})" class="favorite-btn">
                    <i class="far fa-heart"></i> お気に入り
                </button>
            </div>
        `;
        return card;
    }

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

    // ソート機能
    const sortProperties = (properties, sortBy) => {
        return [...properties].sort((a, b) => {
            switch(sortBy) {
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'size-asc':
                    return a.size - b.size;
                case 'size-desc':
                    return b.size - a.size;
                default:
                    return 0;
            }
        });
    };

    // ページネーション
    function paginate(items, currentPage, itemsPerPage) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
    }
});

// 物件詳細モーダル
function showPropertyDetail(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    const modal = document.createElement('div');
    modal.className = 'property-modal';
    // モーダルの内容を設定
}

// 地図表示（Google Maps API使用の例）
function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 35.6812, lng: 139.7671 },
        zoom: 12
    });
    // マーカーの追加など
}
