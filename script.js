// Complete interactive navigation logic for brand selection, category selection, and link display

document.addEventListener('DOMContentLoaded', function() {
    const brandSelect = document.getElementById('brand-select');
    const categorySelect = document.getElementById('category-select');
    const linkDisplay = document.getElementById('link-display');

    const data = {
        'BrandA': {
            'Category1': 'https://example.com/brandA/category1',
            'Category2': 'https://example.com/brandA/category2',
        },
        'BrandB': {
            'Category1': 'https://example.com/brandB/category1',
            'Category2': 'https://example.com/brandB/category2',
        },
    };

    brandSelect.addEventListener('change', function() {
        const selectedBrand = brandSelect.value;
        updateCategorySelect(selectedBrand);
    });

    categorySelect.addEventListener('change', function() {
        const selectedBrand = brandSelect.value;
        const selectedCategory = categorySelect.value;
        updateLinkDisplay(selectedBrand, selectedCategory);
    });

    function updateCategorySelect(brand) {
        categorySelect.innerHTML = '';
        const categories = Object.keys(data[brand] || {});
        categories.forEach(function(category) {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
        linkDisplay.textContent = ''; // Clear the link display
    }

    function updateLinkDisplay(brand, category) {
        const link = data[brand][category];
        linkDisplay.textContent = link ? `Link: ${link}` : 'Select a category to see the link.';
    }
});
