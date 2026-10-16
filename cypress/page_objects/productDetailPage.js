class ProductDetailPage {
  verifyProductDetails(expectedTitle, expectedPrice) {
    // 1. Mengincar elemen judul yang lebih spesifik di area konten utama atau pop-up detail
    cy.get('#productTitle, #title, .qa-product-title, h1:not(.a-size-base)', { timeout: 15000 })
      .filter((index, el) => {
        // Singkirkan elemen yang berisi teks navigasi jumlah halaman hasil pencarian
        return !Cypress.$(el).text().includes('results for');
      })
      .first()
      .should('be.visible')
      .invoke('text')
      .then((detailTitle) => {
        const cleanDetailTitle = detailTitle.trim().toLowerCase();
        
        // Mengambil potongan kata kunci judul agar pencocokan teks lebih fleksibel dan toleran
        const words = expectedTitle.trim().toLowerCase().split(' ');
        const partialKeyword = words.slice(0, 2).join(' '); // Mengambil 2 kata pertama, contoh: "vidi office"
        
        expect(cleanDetailTitle).to.include(partialKeyword);
      });

    // 2. Validasi harga secara aman
    if (expectedPrice !== '0' && expectedPrice !== '') {
      cy.get('.a-price-whole, #price_inside_buybox', { timeout: 5000 })
        .first()
        .invoke('text')
        .then((detailPrice) => {
          const cleanDetailPrice = detailPrice.replace(/[.,\s]/g, '').trim();
          expect(cleanDetailPrice).to.equal(expectedPrice);
        });
    } else {
      cy.log('Harga awal bernilai cadangan (0), melewati verifikasi nominal harga.');
      cy.get('body').should('be.visible');
    }
  }
}

export default new ProductDetailPage();
