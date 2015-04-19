//

MarineFactory = function()
{
	this.teamComponent = null;
	this.positionComponent = null;

	// defining a marine
	var health = 55.0;
	var armor = 0.0;
	var armorType = ArmorType.Light;

	var armorComponent = new ArmorComponent();
	armorComponent.setMaxHealth(health);
	armorComponent.setHealth(health);
	armorComponent.setArmor(armor);
	armorComponent.setArmorType(armorType);

	var sight = 9.0;
	var speed = 2.25;

	var damage = 6.0;
	var cooldown = 0.86;

	var marine = Unit.new();


};

MarineFactory.prototype.setTeamComponent = function()
{

};