class SearchPage {
  navigate() {
    // Cukup gunakan '/' untuk memanggil baseUrl utama secara aman
    cy.visit('/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
  }
  
    searchItem(item) {
    // Memberikan delay 150ms per karakter saat mengetik agar menyerupai ketikan manusia
    cy.get('#twotabsearchtextbox', { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(item, { delay: 150 });
      
    // Melakukan klik pada tombol kaca pembesar (search button) alih-alih menekan tombol enter instan
    cy.get('#nav-search-submit-button').click();
  }

    sortByPriceHighToLow() {
    // 1. Berikan jeda 2 detik setelah halaman pencarian terbuka agar komponen DOM stabil
    cy.wait(2000);

    // 2. Gunakan kombinasi selektor yang lebih stabil dan tambahkan interaksi klik yang dipaksa ({force: true})
    cy.get('#a-autoid-0-announce, [data-action="a-dropdown-button"]', { timeout: 10000 })
      .first()
      .should('be.visible')
      .click({ force: true });
      
    // 3. Memilih opsi urutan 'Price: High to Low' langsung lewat elemen select asli
    cy.get('select#s-result-sort-select', { timeout: 10000 })
      .select('price-desc-rank', { force: true });
    
    // 4. Tunggu 3 detik agar daftar produk selesai mengurutkan dari harga termahal
    cy.wait(3000);
  }

        selectFirstRowRightmostProduct() {
    // 1. Ambil seluruh kartu produk valid di halaman pencarian
    cy.get('[data-component-type="s-search-result"]', { timeout: 10000 })
      .should('have.length.at.least', 4)
      .then(($products) => {
        // 2. Ambil 4 produk pertama di baris pertama
        const firstRow = $products.toArray().slice(0, 4);
        // 3. Pilih produk paling kanan
        const rightmostProduct = firstRow[firstRow.length - 1];

        // 4. Masuk ke dalam elemen produk tersebut
        cy.wrap(rightmostProduct).within(($el) => {
          // Mengambil teks judul produk dari tag h2
          cy.get('h2').invoke('text').then((titleText) => {
            cy.wrap(titleText.trim()).as('searchPageTitle');
          });

          // Cek apakah elemen harga .a-price-whole ada di kartu barang ini
          if ($el.find('.a-price-whole').length > 0) {
            cy.get('.a-price-whole').first().invoke('text').then((priceText) => {
              const cleanPrice = priceText.replace(/[.,\s]/g, '').trim();
              cy.wrap(cleanPrice).as('searchPagePrice');
            });
          } else {
            cy.wrap('0').as('searchPagePrice');
          }

          // SOLUSI KOKOH: Cari elemen link 'a' apa saja yang tersedia di dalam kartu produk ini dan klik yang pertama
          cy.get('a').first().click({ force: true });
        });
      });
  }


}
export default new SearchPage();
