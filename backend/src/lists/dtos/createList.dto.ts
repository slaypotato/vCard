export class CreateListDto {
    listName: string;
    ownerId: string;
    products: [
        {
            _id: string,
            productName: string,
            description: string,
            unit: string,
            pricePerUnit: number,
            picturePath: string,
            additionalFields: []
        }
    ];
}