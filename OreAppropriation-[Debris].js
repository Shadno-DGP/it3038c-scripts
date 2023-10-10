/*

Ore appropriation

bot coded by Shadno to mine Debris

Fork of DebrisBot (Shadno) which is a heavily modified fork of AdvancedQuarryBot (Yodabird19)


Requirements:
Efficiency 2 (min) Diamond Pickaxes
Food (in hotbar)
Placeable block in hotbar (netherrack)


*/














//uneditable reference vars

const p = Player.getPlayer()
const targetFeetY = p.getPos().y
bridgeQueue = 0
walkAttempt = 0
yRecovery = false

//grab starting alingment based on player facing direction
function getStartAlign()
{
    yaw = p.getYaw()
    if (yaw > -44 && yaw < 45)
    {
        BotMode = "MainSouth"
        p.lookAt(0,0)
    }
    if (yaw > 45 && yaw < 135)
    {
        BotMode = "MainWest"
        p.lookAt(90,0)
    }
    if (yaw > 135 && yaw < 181 )
    {
        BotMode = "MainNorth"
        p.lookAt(180,0)
    }
    if (yaw < -135 && yaw > -181)
    {
        BotMode = "MainNorth"
        p.lookAt(180,0)
    }
    if (yaw > -135 && yaw < -45)
    {
        BotMode = "MainEast"
        p.lookAt(-90,0)
    }
}
getStartAlign()

//get coordinate functions
function getX() {
    return Math.floor(p.getPos().x)
}
function getY() {
    return Math.floor(p.getPos().y)
}
function getZ() {
    return Math.floor(p.getPos().z)
}

//block list
const placeableBlocks = ["minecraft:netherrack"]

//grab block
function grabPlaceableBlock() {
    // Has the bot found a placeable block yet?
    blockFound = false
    // Loop through hotbar, stop if end reached or block is found
    let inv = Player.openInventory()
    for (i = 0; i <= 8 && !blockFound; i++) {
        // If a placeable block is found in the hotbar, select it and terminate loop
        if (placeableBlocks.includes(inv.getSlot(i+36).getItemId())) {
            blockFound = true
            inv.setSelectedHotbarSlotIndex(i);
        }
    }
    if (!blockFound) {
        Chat.log("Could not find placeable block in hotbar.")
        BotMode = "Terminate"
    }
}


//attempts to correct elevation
function correctElevation(targetY) {
    while (getY() < targetY && BotMode != "Terminate")
    {
        yRecovery = true
        attempt++;
        if (attempt > 15)
        {
            BotMode = "Terminate"
        }
        Chat.actionbar("\u00A77\u00A7lElevation Correction Attempt: \u00A7c" + getY() + "/" + targetY, false)
        KeyBind.keyBind("key.forward", false)
        KeyBind.keyBind("key.attack", false)
        if (BotMode == "MainEast")
        {
            p.lookAt(-90,90)
        }
        if (BotMode == "MainWest")
        {
            p.lookAt(90,90)  
        }
        grabPlaceableBlock()
        p.lookAt(-90,90)
        KeyBind.keyBind("key.use", true)
        KeyBind.keyBind("key.jump", true)
        p.getRaw().method_5814(Math.floor(p.getX()) + 0.5, p.getY(), Math.floor(p.getZ()) + 0.5);
        Time.sleep(300)
        if (attempt > 5)
        {
            grabPickaxe()
            if (BotMode == "MainEast")
            {
                p.lookAt(-90,-90)
                KeyBind.keyBind("key.attack", true)
                Time.sleep(1000)
                KeyBind.keyBind("key.attack", false)
            }
            if (BotMode == "MainWest")
            {
                p.lookAt(90,-90)
                KeyBind.keyBind("key.attack", true)
                Time.sleep(1000)
                KeyBind.keyBind("key.attack", false)
            }
        }
        KeyBind.keyBind("key.use", false)
        KeyBind.keyBind("key.jump", false)
        Time.sleep(500)
    }
    attempt = 0
    if (yRecovery == true && getY() == targetY)
    {
        if (BotMode == "MainWest")
        {
            p.lookAt(90,13)
            grabPickaxe()
            yRecovery = false
        }
        if (BotMode == "MainEast")
        {
            p.lookAt(-90,13)
            grabPickaxe()
            yRecovery = false
        }
        if (BotMode == "MainNorth")
        {
            p.lookAt(-180,13)
            grabPickaxe()
            yRecovery = false
        }
        if (BotMode == "MainSouth")
        {
            p.lookAt(0,13)
            grabPickaxe()
            yRecovery = false
        }
    }
}
    

//food list
const validFood = ['minecraft:bread',"minecraft:cooked_porkchop","minecraft:cooked_mutton","minecraft:cooked_salmon","minecraft:cooked_beef",
"minecraft:baked_potato","minecraft:melon_slice","minecraft:carrot","minecraft:cooked_chicken","minecraft:cooked_cod",
"minecraft:cooked_rabbit","minecraft:cookie","minecraft:potato","minecraft:pumpkin_pie","minecraft:glow_berries","minecraft:tropical_fish"
,"minecraft:sweet_berries","minecraft:golden_carrot"]

//grab food from hotbar
function grabFood() {
    // Has the bot found a placeable block yet?
    blockFound = false
    // Loop through hotbar, stop if end reached or block is found
    let inv = Player.openInventory()
    for (i = 0; i <= 8 && !blockFound; i++) {
        // If a placeable block is found in the hotbar, select it and terminate loop
        if (validFood.includes(inv.getSlot(i+36).getItemId())) {
            blockFound = true
            inv.setSelectedHotbarSlotIndex(i);
        }
    }
    if (!blockFound) {
        Chat.log("Could not find validFood in hotbar.")
        BotMode = "Terminate"
    }
}

//check if food is needed, if so eat it
function eatCheck(){
if (p.getFoodLevel() < 10) {
            Chat.log("Food level low, auto eating");
            grabFood()
            Client.waitTick(10);
            KeyBind.key("key.mouse.right",true)
            Client.waitTick(ticksToHoldHown);
            KeyBind.key("key.mouse.right",false)
            grabPickaxe()
        }
}

//grab pickaxe
function grabPickaxe() {
    // List of items the bot registers as pickaxes.
    pickaxeItems = ["minecraft:diamond_pickaxe", "minecraft:netherite_pickaxe"]
    // Has the bot found a pickaxe yet?
    pickFound = false
    // Loop through hotbar, stop if end reached or pickaxe is found
    let inv = Player.openInventory()
    for (i = 0; i <= 8 && !pickFound; i++) {
        // If a pickaxe is found in the hotbar, select it and terminate loop
        if (pickaxeItems.includes(inv.getSlot(i+36).getItemId())&&inv.getSlot(i+36).getDamage()<1530) {
            pickFound = true
            inv.setSelectedHotbarSlotIndex(i);
        }
    }
    if (!pickFound) {
        Chat.log("Could not find pickaxe in hotbar. Terminating.")
        BotMode = "Terminate"
    }
}

function bridgeWest()
{
    grabPlaceableBlock()
    p.getRaw().method_5814(Math.floor(p.getX()) + 0.5, p.getY(), Math.floor(p.getZ()) + 0.5);
    targetFeetX = getX()
    feetXGoal = targetFeetX - .5;
    while (targetFeetX > feetXGoal)
    {
        KeyBind.keyBind("key.forward", true)
        targetFeetX = getX()
        Time.sleep(90)
        KeyBind.keyBind("key.sneak", true)
    }
    KeyBind.keyBind("key.sneak", false)
    p.lookAt(-90,80)
    KeyBind.keyBind("key.forward", false)
    KeyBind.keyBind("key.use", true)
    Time.sleep(100)
    KeyBind.keyBind("key.use", false)
    p.lookAt(90,50)

    /*
 	p.lookAt(currentYaw,84)
	grabPlaceableBlock()
	KeyBind.keyBind("key.use", true)
	Time.sleep(120)
	KeyBind.keyBind("key.use", false)
	*/
	grabPickaxe()
	walkAttempt = 0
}

//attempt to mine forward by one [1] block
function mine1()
{
	p.getRaw().method_5814(Math.floor(p.getX()) + 0.5, p.getY(), Math.floor(p.getZ()) + 0.5);
	KeyBind.keyBind("key.forward", false)
	KeyBind.keyBind("key.attack", true)
	currentYaw = p.getYaw()
	p.lookAt(currentYaw,50)
	Time.sleep(175)
	KeyBind.keyBind("key.attack", false)
	correctElevation(124)
	if (bridgeQueue > 0)
	{
		bridgeWest()
		bridgeQueue = bridgeQueue - 1
	}

	/*
	p.lookAt(currentYaw,65)
	grabPlaceableBlock()
	KeyBind.keyBind("key.use", true)
	Time.sleep(60)
	KeyBind.keyBind("key.use", false)
	grabPickaxe()
	p.lookAt(currentYaw,50)
	Time.sleep(3000000000)
	/*


	/*
	p.lookAt(currentYaw,45)
	Time.sleep(80)
	p.lookAt(currentYaw,0)
	Time.sleep(30)
	*/
}

function mine2()
{
	p.getRaw().method_5814(Math.floor(p.getX()) + 0.5, p.getY(), Math.floor(p.getZ()) + 0.5);
	KeyBind.keyBind("key.forward", false)
	KeyBind.keyBind("key.attack", false)
	currentYaw = p.getYaw()
	p.lookAt(currentYaw,47.5)
	KeyBind.keyBind("key.attack", true)
	Time.sleep(1000)
	KeyBind.keyBind("key.attack", false)
	bridgeWest()
	bridgeQueue = 3
	grabPickaxe()


}

//set coordinate goal of walking based on mining direction
function walkGoal()
{	
	if (BotMode == "MainWest")
	{
		targetFeetX = getX()
    	feetXGoal = targetFeetX - .5;
	}
	if (BotMode == "MainEast")
	{
	    targetFeetX = getX()
	    feetXGoal = targetFeetX + .5;
	}
	if (BotMode == "MainNorth")
	{
		targetFeetZ = getZ()
    	feetZGoal = targetFeetZ - .5;
	}
	if (BotMode == "MainSouth")
	{
		targetFeetZ = getZ()
    	feetZGoal = targetFeetZ + .5;
	}
}

//attempt to sprint forward by one [1] block depending on direction chosen in walkGoal() function
function walk1()
{
	walkAttempt = 0
	KeyBind.keyBind("key.attack", false)
	if (BotMode == "MainWest")
	{
		while (targetFeetX > feetXGoal)
		{
			KeyBind.keyBind("key.forward", true)
			targetFeetX = getX()
			walkAttempt++;
			Time.sleep(1)
			Chat.actionbar(walkAttempt, false)
			if (walkAttempt > 150)
			{
				Chat.log("mine2")
				mine2()
				walkAttempt = 0
			}
		}
	}
	if (BotMode == "MainEast")
	{
		while (targetFeetX < feetXGoal)
		{
			KeyBind.keyBind("key.forward", true)
			targetFeetX = getX()
			walkAttempt++;
		}
	}
	if (BotMode == "MainNorth")
	{
		while (targetFeetZ > feetZGoal)
		{
			KeyBind.keyBind("key.forward", true)
			targetFeetZ = getZ()
			walkAttempt++;
		}
	}
	if (BotMode == "MainSouth")
	{
		while (targetFeetZ < feetZGoal)
		{
			KeyBind.keyBind("key.forward", true)
			targetFeetZ = getZ()
			walkAttempt++;
		}
	}
}

//actions that happen inside the constant loop
function Tick()
{
	grabPickaxe()
	mine1()
	walkGoal()
	walk1()	

}

//constant loop for bot operation
while (BotMode != "Terminate")
{
	Tick()
}
