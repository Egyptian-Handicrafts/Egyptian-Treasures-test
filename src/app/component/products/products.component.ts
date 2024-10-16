import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../Services/product.service';
import { Router } from '@angular/router';
import { Iproduct } from '../interfaces/Iproduct';
import { CartService } from '../../Services/cart.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
clearFilter() {
  this.filterCategory = '';
  this.filterPrice = null;
  this.applyFilters();
}
  cartCount: number = 0;
  
  goToCart() {
    this.router.navigate(['/cart'])
  }

  products: Iproduct[] = [];
  filteredProducts: Iproduct[] = [];
  errMsg: string | null = null;
  isFilterVisible = false;
  searchTerm: string = '';
  filterCategory: string = '';
  filterPrice: number | null = null;
  filterDate: string = ''; // To hold the selected date

  constructor(private productService: ProductService, 
    private router: Router, private cartService: CartService, private spinner: NgxSpinnerService) { }
    addToCart(product: Iproduct) {
    this.cartCount++;
    // window.localStorage.setItem('Iproduct', JSON.stringify(product));
    this.cartService.addToCart(product);
  }
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log(this.products);
        this.filteredProducts = data;
      },
      error: (err) => {
        this.errMsg = err;
      },
    });
  }
  goToProductDetails(id: string) {
    this.router.navigate(['/product', id])
  }
  // Toggle Filter Visibility
  toggleFilter() {
    this.isFilterVisible = !this.isFilterVisible;
  }

  // Search Functionality
  searchProducts() {
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Apply Filters based on User Input
  applyFilters() {
    this.filteredProducts = this.products.filter((product) => {
      const matchesCategory = this.filterCategory
        ? product.name.toLowerCase().includes(this.filterCategory.toLowerCase())
        : true;
      const matchesPrice = this.filterPrice
        ? product.price <= this.filterPrice
        : true;
      const matchesDate = this.filterDate
        ? this.checkDateCondition(product.date)
        : true;

      return matchesCategory && matchesPrice && matchesDate;
    });
  }

  // Date Filter Condition
  checkDateCondition(productDate: string): boolean {
    // Implement custom date filtering logic if needed
    return true;
  }

  // Get products in chunks for the carousel
  get filteredProductsChunks() {
    const chunkSize = 3;
    const chunks = [];
    for (let i = 0; i < this.filteredProducts.length; i += chunkSize) {
      chunks.push(this.filteredProducts.slice(i, i + chunkSize));
    }
    return chunks;
  }

  openSpinner1() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
}
