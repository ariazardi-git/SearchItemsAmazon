import searchPage from '../page_objects/searchPage';
import productDetailPage from '../page_objects/productDetailPage';

describe('Final Project Bootcamp Cypress AfterOffice Batch #1', () => {

  it('Harus berhasil melakukan pencarian, sorting, dan verifikasi detail produk', function() {
    
    // 1. Buka situs Amazon
    searchPage.navigate();

    // 2. Cari item 'chair'
    searchPage.searchItem('chair');

    // 3. Urutkan berdasarkan harga termahal
    searchPage.sortByPriceHighToLow();

    // 4. Pilih item paling kanan baris pertama (bukan iklan) & ambil datanya
    searchPage.selectFirstRowRightmostProduct();

    // 5. Validasi ekspektasi nama barang dan harga di halaman detail
    cy.then(() => {
      productDetailPage.verifyProductDetails(this.searchPageTitle, this.searchPagePrice);
    });
    
  });
});
