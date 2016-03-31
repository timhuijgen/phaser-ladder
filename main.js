// needed globals:
// Phaser game
// Phaser character
// ladders

this.onLadder = false;

function moveLadder() {
    let ladders = this.game.ladders;
    let onLadder = this.onLadder;
    let match = false;

    // Loop all ladder / ropes
    for (let i = 0, length = ladders.length; i < length; i++) {
        // Check if the character is intersecting with the ladder
        if (Phaser.Rectangle.intersects(this.character.body, ladders[i])) {
            match = true;

            // If either up or down is pressed
            if (this.character.Keymap.isDown(ACTION.UP) || this.character.Keymap.isDown(ACTION.DOWN)) {
                onLadder = true;
                // Add ignore collision based on ladders
                if (ladders[i].ignoreCollision.length) {
                    for (let l = 0; l < ladders[i].ignoreCollision.length; l++) {
                        this.character.body.checkCollision[ladders[i].ignoreCollision[l]] = false;
                    }
                }
            }

            // If attached to ladder, set the correct player sprite
            if (onLadder) {
                this.character.frame = 4;
            }

            // If the action going up is pressed
            if (this.character.Keymap.isDown(ACTION.UP)) {
                // Set velocity to go up
                this.character.body.velocity.y = -this.game.velocity.x;
                // Player animation for going up
                // ...
            }
            // If the action going down is pressed
            else if (this.character.Keymap.isDown(ACTION.DOWN)) {
                // Set velocity to go down
                this.character.body.velocity.y = this.game.velocity.x;
                // Player animation for going down
                // ...
            }

            // If we are on the ladder ( not falling through ) and we are not pressing up/down
            if (onLadder && !this.character.Keymap.isDown(ACTION.UP) && !this.character.Keymap.isDown(ACTION.DOWN)) {
                // Set gravity and velocity to none to stop movement
                this.character.body.allowGravity = false;
                this.character.body.velocity.y = 0;
            }
        }
    }

    // If we are not colliding with any ladders
    if (!match) {
        // Return all collision and gravity to normal
        onLadder = false;
        this.character.body.checkCollision.up = true;
        this.character.body.checkCollision.down = true;
        this.character.body.allowGravity = true;
    }

    // Update the current ladder status
    this.onLadder = onLadder;
}
