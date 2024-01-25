import {Component, inject} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContainer,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {Categories} from "../../models/categories";
import {ProductRequest} from "../../models/product-request";
import {ProductService} from "../../services/product.service";
import {SnackbarService} from "../../services/util/snackbar.service";

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogClose,
    MatDialogContainer,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    FormsModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  categories: Array<Categories> = ['FASHION', 'BEAUTY', 'ACCESSORIES', 'GROCERY', 'ELECTRONICS']
  productRequest: ProductRequest = {
    name: '',
    category: undefined,
    quantity: 0,
    price: 0,
    image: null
  }

  private productService: ProductService = inject(ProductService)
  private snack: SnackbarService = inject(SnackbarService)
  private dialogRef: MatDialogRef<AddProductComponent> = inject(MatDialogRef)

  onSubmit() {
    const formData = new FormData();
    formData.append("name", this.productRequest.name)
    if (this.productRequest.category)
      formData.append("category", this.productRequest.category)
    formData.append("price", this.productRequest.price.toString())
    formData.append("quantity", this.productRequest.quantity.toString())
    if (this.productRequest.image)
      formData.append("image", this.productRequest.image)

    console.log(formData.get("name"))
    console.log(formData.get("category"))
    console.log(formData.get("price"))
    console.log(formData.get("quantity"))
    console.log(formData.get("image"))
    this.productService.addProduct(formData).subscribe({
      next: (data) => {
        console.log(data)
        this.dialogRef.close()
        this.snack.openSnack("Added Successfully!!!")
      },
      error: (err) => {
        this.snack.openSnack(err.error.message)
      }
    })
  }

  onFileSelected($event: any) {
    this.productRequest.image = $event.target.files[0]
  }
}
