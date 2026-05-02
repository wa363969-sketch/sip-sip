import Map "mo:core/Map";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Types "../types/menu";

module {
  public type MenuState = Map.Map<Text, Types.Product>;

  public func initWithDefaults(state : MenuState) {
    let defaults : [Types.Product] = [
      {
        id = "p001";
        name = "Pike Place Roast";
        description = "A smooth, well-rounded blend of Latin American coffees with subtly rich flavors of cocoa and soft spice.";
        imageUrl = "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_PikePlaceRoast.jpg";
        priceInCents = 395;
        category = #hotDrinks;
        nutritionalInfo = { calories = 5; fat = 0.1; carbs = 1.0; protein = 0.3 };
        available = true;
      },
      {
        id = "p002";
        name = "Caffè Latte";
        description = "Our dark, rich espresso balanced with steamed milk and a light layer of foam.";
        imageUrl = "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_CaffeLatte.jpg";
        priceInCents = 495;
        category = #hotDrinks;
        nutritionalInfo = { calories = 190; fat = 7.0; carbs = 19.0; protein = 13.0 };
        available = true;
      },
      {
        id = "p003";
        name = "Caffè Americano";
        description = "Espresso shots topped with hot water to produce a light layer of crema.";
        imageUrl = "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_CaffeAmericano.jpg";
        priceInCents = 395;
        category = #hotDrinks;
        nutritionalInfo = { calories = 15; fat = 0.0; carbs = 2.0; protein = 1.0 };
        available = true;
      },
      {
        id = "p004";
        name = "Cappuccino";
        description = "Dark, rich espresso lies in wait under a smoothed and stretched layer of thick, micro-foam.";
        imageUrl = "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_Cappuccino.jpg";
        priceInCents = 495;
        category = #hotDrinks;
        nutritionalInfo = { calories = 140; fat = 5.0; carbs = 14.0; protein = 9.0 };
        available = true;
      },
      {
        id = "p005";
        name = "Iced Coffee";
        description = "Freshly brewed coffee, sweetened and served over ice for a refreshing cool drink.";
        imageUrl = "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_IcedCoffee.jpg";
        priceInCents = 375;
        category = #coldDrinks;
        nutritionalInfo = { calories = 80; fat = 0.0; carbs = 20.0; protein = 0.0 };
        available = true;
      },
      {
        id = "p006";
        name = "Iced Caffè Latte";
        description = "Our espresso combined with milk and ice is always refreshingly delicious.";
        imageUrl = "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_IcedCaffeLatte.jpg";
        priceInCents = 495;
        category = #coldDrinks;
        nutritionalInfo = { calories = 130; fat = 4.5; carbs = 13.0; protein = 9.0 };
        available = true;
      },
      {
        id = "p007";
        name = "Cold Brew Coffee";
        description = "Smooth, small-batch cold brew, slow-steeped in cool water for 20 hours.";
        imageUrl = "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_ColdBrew.jpg";
        priceInCents = 495;
        category = #coldDrinks;
        nutritionalInfo = { calories = 5; fat = 0.0; carbs = 0.0; protein = 0.5 };
        available = true;
      },
      {
        id = "p008";
        name = "Iced Matcha Latte";
        description = "Smooth and creamy matcha sweetened just right and served with milk over ice.";
        imageUrl = "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_MatchaLatte.jpg";
        priceInCents = 545;
        category = #coldDrinks;
        nutritionalInfo = { calories = 200; fat = 5.0; carbs = 28.0; protein = 9.0 };
        available = true;
      },
      {
        id = "p009";
        name = "Caramel Frappuccino";
        description = "Caramel syrup meets coffee, milk and ice, layered on top of a caramel drizzle and finished with whipped cream.";
        imageUrl = "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_CaramelFrappuccino.jpg";
        priceInCents = 545;
        category = #frappuccinos;
        nutritionalInfo = { calories = 420; fat = 15.0; carbs = 66.0; protein = 5.0 };
        available = true;
      },
      {
        id = "p010";
        name = "Java Chip Frappuccino";
        description = "Mocha sauce and Frappuccino® chips blended with coffee, milk and ice. Topped with whipped cream and mocha drizzle.";
        imageUrl = "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_JavaChipFrappuccino.jpg";
        priceInCents = 545;
        category = #frappuccinos;
        nutritionalInfo = { calories = 470; fat = 18.0; carbs = 68.0; protein = 7.0 };
        available = true;
      },
      {
        id = "p011";
        name = "Matcha Frappuccino";
        description = "Matcha tea blended with milk and ice, topped with whipped cream.";
        imageUrl = "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_MatchaFrappuccino.jpg";
        priceInCents = 545;
        category = #frappuccinos;
        nutritionalInfo = { calories = 420; fat = 15.0; carbs = 64.0; protein = 6.0 };
        available = true;
      },
      {
        id = "p012";
        name = "Butter Croissant";
        description = "A classic buttery croissant baked fresh daily, flaky and golden.";
        imageUrl = "https://globalassets.starbucks.com/digitalassets/products/food/SBX20190617_ButterCroissant.jpg";
        priceInCents = 345;
        category = #food;
        nutritionalInfo = { calories = 300; fat = 17.0; carbs = 32.0; protein = 5.0 };
        available = true;
      },
      {
        id = "p013";
        name = "Blueberry Muffin";
        description = "A moist and fluffy muffin bursting with sweet blueberries.";
        imageUrl = "https://globalassets.starbucks.com/digitalassets/products/food/SBX20190617_BlueberryMuffin.jpg";
        priceInCents = 325;
        category = #food;
        nutritionalInfo = { calories = 380; fat = 14.0; carbs = 58.0; protein = 5.0 };
        available = true;
      },
      {
        id = "p014";
        name = "Chicken & Bacon Panini";
        description = "Tender chicken, crispy bacon, and provolone cheese on toasted ciabatta bread.";
        imageUrl = "https://globalassets.starbucks.com/digitalassets/products/food/SBX20190617_ChickenBaconPanini.jpg";
        priceInCents = 795;
        category = #food;
        nutritionalInfo = { calories = 500; fat = 18.0; carbs = 52.0; protein = 33.0 };
        available = true;
      },
    ];
    for (p in defaults.values()) {
      state.add(p.id, p);
    };
  };

  public func listAll(state : MenuState) : [Types.Product] {
    state.entries()
      .map(func((_, p) : (Text, Types.Product)) : Types.Product { p })
      .toArray();
  };

  public func listByCategory(state : MenuState, category : Types.Category) : [Types.Product] {
    state.entries()
      .filter(func((_, p) : (Text, Types.Product)) : Bool { p.category == category })
      .map(func((_, p) : (Text, Types.Product)) : Types.Product { p })
      .toArray();
  };

  public func search(state : MenuState, term : Text) : [Types.Product] {
    let lower = term.toLower();
    state.entries()
      .filter(func((_, p) : (Text, Types.Product)) : Bool {
        p.name.toLower().contains(#text lower) or p.description.toLower().contains(#text lower)
      })
      .map(func((_, p) : (Text, Types.Product)) : Types.Product { p })
      .toArray();
  };

  public func getProduct(state : MenuState, id : Text) : ?Types.Product {
    state.get(id);
  };

  public func addProduct(state : MenuState, product : Types.Product) {
    state.add(product.id, product);
  };

  public func updateProduct(state : MenuState, product : Types.Product) {
    state.add(product.id, product);
  };

  public func deleteProduct(state : MenuState, id : Text) {
    state.remove(id);
  };

  public func setAvailability(state : MenuState, id : Text, available : Bool) {
    switch (state.get(id)) {
      case (?p) { state.add(id, { p with available }) };
      case null {};
    };
  };
};
