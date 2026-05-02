module {
  public type Category = {
    #hotDrinks;
    #coldDrinks;
    #frappuccinos;
    #food;
  };

  public type NutritionalInfo = {
    calories : Nat;
    fat : Float;
    carbs : Float;
    protein : Float;
  };

  public type Product = {
    id : Text;
    name : Text;
    description : Text;
    imageUrl : Text;
    priceInCents : Nat;
    category : Category;
    nutritionalInfo : NutritionalInfo;
    available : Bool;
  };
};
