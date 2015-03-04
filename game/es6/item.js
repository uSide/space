class Item extends Entity {
    isDroppable = true;

    price = 1;
    weight = 1;

    inventoryTexture = false;

    setInventoryTexture(textures) {
        var movie = new PIXI.MovieClip(textures);

        movie.play();
        movie.animationSpeed = 0.3;

        this.inventoryTexture = movie;
    }
}