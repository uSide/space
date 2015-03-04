class Ship extends Entity{
	engine = false;

	body = false;

	// TODO: Other items

	inventory = [];

	setInventory(inv){
		this.inventory = inv;
	}

	addItemToInventory(item){
		this.inventory.push(item);
	}

	removeItemFromInventory(itemForRemove){
		inventory.forEach(function(item, i){
			if(item == itemForRemove){
				inventory.splice(i,1);
			}
		});
	}
}