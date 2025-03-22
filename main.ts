enum ActionKind {
    RunningLeft,
    RunningRight,
    Idle,
    IdleLeft,
    IdleRight,
    JumpingLeft,
    JumpingRight,
    CrouchLeft,
    CrouchRight,
    Flying,
    Walking,
    Jumping
}
namespace SpriteKind {
    export const Bumper = SpriteKind.create()
    export const Goal = SpriteKind.create()
    export const Coin = SpriteKind.create()
    export const Flier = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Bumper, function (sprite, otherSprite) {
    if (sprite.vy > 0 && !(sprite.isHittingTile(CollisionDirection.Bottom)) || sprite.y < otherSprite.top) {
        otherSprite.destroy(effects.ashes, 250)
        otherSprite.vy = -50
        sprite.vy = -2 * pixelsToMeters
        info.changeScoreBy(1)
        music.powerUp.play()
    } else {
        info.changeLifeBy(-1)
        sprite.say("Ow!", invincibilityPeriod)
        music.powerDown.play()
    }
    pause(invincibilityPeriod)
})
function initializeAnimations () {
    initializeHeroAnimations()
    initializeCoinAnimation()
    initializeFlierAnimations()
}
function giveIntroduction () {
    game.setDialogFrame(img`
        . 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
        8 8 2 2 2 2 2 2 2 2 2 2 2 2 8 8 
        8 2 2 8 8 8 8 8 8 8 8 8 f 2 2 8 
        8 2 8 8 1 1 1 1 1 1 1 8 8 f 2 8 
        8 2 8 1 1 1 1 1 1 1 1 1 8 f 2 8 
        8 2 8 1 1 1 1 1 1 1 1 1 8 f 2 8 
        8 2 8 1 1 1 1 1 1 1 1 1 8 f 2 8 
        8 2 8 1 1 1 1 1 1 1 1 1 8 f 2 8 
        8 2 8 1 1 1 1 1 1 1 1 1 8 f 2 8 
        8 2 8 1 1 1 1 1 1 1 1 1 8 f 2 8 
        8 2 8 1 1 1 1 1 1 1 1 1 8 f 2 8 
        8 2 8 8 1 1 1 1 1 1 1 8 8 f 2 8 
        8 2 f 8 8 8 8 8 8 8 8 8 f 2 2 8 
        8 2 2 f f f f f f f f f 2 2 8 8 
        8 8 2 2 2 2 2 2 2 2 2 2 2 8 8 8 
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
        `)
    game.setDialogCursor(img`
        . . . . . . . . . . . . . . . . 
        . . . . . b b . . . . . . . . . 
        . . . . . b b . . . . . . . . . 
        . . . . . b b . . . . . . . . . 
        . . . b . b b b b b b . . . . . 
        . . . b . b b b b b b b . . . . 
        . . . b . b b b b b b b . . . . 
        . . . b . b b b b b b b . . . . 
        . . . b . b b b b b b b . . . . 
        . . . b . b b b b b b b . . . . 
        . . . b . b b b b b b b . . . . 
        . . . b . b b b b b b . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    showInstruction("Move with the left and right buttons.")
    showInstruction("Jump with the up or A button.")
    showInstruction("Double jump by pressing jump again.")
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    attemptJump()
})
function initializeCoinAnimation () {
    coinAnimation = animation.createAnimation(ActionKind.Walking, 200)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        b . . b . . . b . b . . . . . . 
        b b . b . . . b . . . b . . . b 
        b . . . b . b . . b . b . b . b 
        b . . . b . b . . b . . b . b . 
        b . . . . b . . . b . . b . b . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        5 . . 5 . . . 5 . 5 . . . . . . 
        5 5 . 5 . . . 5 . . . 5 . . . 5 
        5 . . . 5 . 5 . . 5 . 5 . 5 . 5 
        5 . . . 5 . 5 . . 5 . . 5 . 5 . 
        5 . . . . 5 . . . 5 . . 5 . 5 . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        b . . b . . . b . b . . . . . . 
        b b . b . . . b . . . b . . . b 
        b . . . b . b . . b . b . b . b 
        b . . . b . b . . b . . b . b . 
        b . . . . b . . . b . . b . b . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        b . . b . . . b . b . . . . . . 
        b b . b . . . b . . . 5 . . . 5 
        b . . . b . b . . b . 5 . 5 . 5 
        b . . . b . b . . b . . 5 . 5 . 
        b . . . . b . . . b . . 5 . 5 . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        b . . b . . . b . 5 . . . . . . 
        b b . b . . . b . . . b . . . b 
        b . . . b . b . . 5 . b . b . b 
        b . . . b . b . . 5 . . b . b . 
        b . . . . b . . . 5 . . b . b . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        b . . 5 . . . 5 . b . . . . . . 
        b b . 5 . . . 5 . . . b . . . b 
        b . . . 5 . 5 . . b . b . b . b 
        b . . . 5 . 5 . . b . . b . b . 
        b . . . . 5 . . . b . . b . b . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        5 . . b . . . b . b . . . . . . 
        5 5 . b . . . b . . . b . . . b 
        5 . . . b . b . . b . b . b . b 
        5 . . . b . b . . b . . b . b . 
        5 . . . . b . . . b . . b . b . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
}
scene.onOverlapTile(SpriteKind.Player, myTiles.tile1, function (sprite, location) {
    info.changeLifeBy(1)
    currentLevel += 1
    if (hasNextLevel()) {
        game.splash("Next level unlocked!")
        setLevelTileMap(currentLevel)
    } else {
        game.over(true, effects.confetti)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {
    otherSprite.destroy(effects.trail, 250)
    otherSprite.y += -3
    info.changeScoreBy(3)
    music.baDing.play()
})
function attemptJump () {
    // else if: either fell off a ledge, or double jumping
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        hero.vy = -4 * pixelsToMeters
    } else if (canDoubleJump) {
        doubleJumpSpeed = -3 * pixelsToMeters
        // Good double jump
        if (hero.vy >= -40) {
            doubleJumpSpeed = -4.5 * pixelsToMeters
            hero.startEffect(effects.trail, 500)
            scene.cameraShake(2, 250)
        }
        hero.vy = doubleJumpSpeed
        canDoubleJump = false
    }
}
function animateIdle () {
    mainIdleLeft = animation.createAnimation(ActionKind.Walking, 100)
    animation.attachAnimation(hero, mainIdleLeft)
    mainIdleLeft.addAnimationFrame(img`
        . . . . f f f f f f f . . . . . 
        . . . . f 8 8 2 8 8 f . . . . . 
        . . . . f 8 8 2 8 8 f . . . . . 
        . . . . f 2 f 2 f 2 f . . . . . 
        . . . . f 8 8 2 8 8 f . . . . . 
        . . . . f 8 8 2 8 8 f . . . . . 
        . . . . f f f f f f f . . . . . 
        . . . . . f 1 1 1 f . . . . . . 
        . . . . f f 1 1 1 f f . . . . . 
        . . . f . f 1 1 1 f . f . . . . 
        . . . f . f 1 1 1 f . f . . . . 
        . . . f . f 1 1 1 f . f . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . . f . 1 . f . . . . . . 
        . . . . . f . 1 . f . . . . . . 
        . . . . . f . 1 . f . . . . . . 
        `)
    mainIdleRight = animation.createAnimation(ActionKind.Walking, 100)
    animation.attachAnimation(hero, mainIdleRight)
    mainIdleRight.addAnimationFrame(img`
        . . . . . f f f f f f f . . . . 
        . . . . . f 8 8 2 8 8 f . . . . 
        . . . . . f 8 8 2 8 8 f . . . . 
        . . . . . f 2 f 2 f 2 f . . . . 
        . . . . . f 8 8 2 8 8 f . . . . 
        . . . . . f 8 8 2 8 8 f . . . . 
        . . . . . f f f f f f f . . . . 
        . . . . . . f 1 1 1 f . . . . . 
        . . . . . f f 1 1 1 f f . . . . 
        . . . . f . f 1 1 1 f . f . . . 
        . . . . f . f 1 1 1 f . f . . . 
        . . . . f . f 1 1 1 f . f . . . 
        . . . . . . f f f f f . . . . . 
        . . . . . . f . 1 . f . . . . . 
        . . . . . . f . 1 . f . . . . . 
        . . . . . . f . 1 . f . . . . . 
        `)
}
function setLevelTileMap (level: number) {
    clearGame()
    if (level == 0) {
        tiles.setTilemap(tilemap`level_0`)
    } else if (level == 1) {
        tiles.setTilemap(tilemap`level_1`)
    } else if (level == 2) {
        tiles.setTilemap(tilemap`level`)
    } else if (level == 3) {
        tiles.setTilemap(tilemap`level_2`)
    } else if (level == 4) {
        tiles.setTilemap(tilemap`level_3`)
    } else if (level == 5) {
        tiles.setTilemap(tilemap`level_4`)
    } else if (level == 6) {
        tiles.setTilemap(tilemap`level_5`)
    } else if (level == 7) {
        tiles.setTilemap(tilemap`level_6`)
    }
    initializeLevel(level)
}
function initializeFlierAnimations () {
    flierFlying = animation.createAnimation(ActionKind.Walking, 100)
    flierFlying.addAnimationFrame(img`
        . f f f f f . . f f f f f . . . 
        f b b b b f f . f b b b b f f f 
        b b b b b b b f f b b b b b b f 
        b b b b b b b b b b b b b b b f 
        b b b b b b b b b b b b b b b f 
        b b b b b b b b b b b b b b b f 
        f f b b b b b b b b b b b b b f 
        9 f f f f b b b b f f f f f f f 
        9 . 6 . f f f f f f 6 9 . 6 . 6 
        9 8 6 . 6 6 . 6 . . 6 9 . 6 9 6 
        . 8 6 9 6 6 . 6 9 . 6 9 8 6 9 8 
        . 8 6 9 6 6 8 6 9 . 6 . 8 6 9 8 
        6 . 6 9 6 . 8 6 9 8 6 . 8 6 . 8 
        6 9 6 9 6 . 8 . . 8 9 . 8 6 . 8 
        6 9 6 . . . 8 . . 8 9 . . . . 8 
        . 9 . . . . . . . 8 9 . . . . . 
        `)
    flierFlying.addAnimationFrame(img`
        . f f f f f . . f f f f f . . . 
        f b b b b f f . f b b b b f f f 
        b b b b b b b f f b b b b b b f 
        b b b b b b b b b b b b b b b f 
        b b b b b b b b b b b b b b b f 
        b b b b b b b b b b b b b b b f 
        f f b b b b b b b b b b b b b f 
        9 f f f f b b b b f f f f f f f 
        9 . 6 . f f f f f f 6 9 . 6 . 6 
        6 9 6 . 9 6 . . 6 . 6 6 . 6 8 9 
        8 9 6 8 9 6 . 9 6 . 6 6 9 6 8 . 
        8 9 6 8 . 6 . 9 6 8 6 6 9 6 8 . 
        8 . 6 8 . 6 8 9 6 8 . 6 9 6 . 6 
        8 . 6 8 . 9 8 . . 8 . 6 9 6 9 6 
        8 . . . . 9 8 . . 8 . . . 6 9 6 
        . 9 . . . . . . . 8 9 . . . . . 
        `)
    flierFlying.addAnimationFrame(img`
        . f f f f f . . f f f f f . . . 
        f b b b b f f . f b b b b f f f 
        b b b b b b b f f b b b b b b f 
        b b b b b b b b b b b b b b b f 
        b b b b b b b b b b b b b b b f 
        b b b b b b b b b b b b b b b f 
        f f b b b b b b b b b b b b b f 
        9 f f f f b b b b f f f f f f f 
        9 . 6 . f f f f f f 6 9 . 6 . 6 
        . . . . . 9 8 . . . . . . . 9 . 
        8 . . . . 9 8 . . 8 . . . 6 9 6 
        8 . 6 8 . 9 8 . . 8 . 6 9 6 9 6 
        8 . 6 8 . 6 8 9 6 8 . 6 9 6 . 6 
        8 9 6 8 . 6 . 9 6 8 6 6 9 6 8 . 
        8 9 6 8 9 6 . 9 6 . 6 6 9 6 8 . 
        6 9 6 . 9 6 . . 6 . 6 6 . 6 8 9 
        `)
    flierIdle = animation.createAnimation(ActionKind.Walking, 100)
    flierIdle.addAnimationFrame(img`
        . f f f f f . . f f f f f . . . 
        f b b b b f f . f b b b b f f f 
        b b b b b b b f f b b b b b b f 
        b b b b b b b b b b b b b b b f 
        b b b b b b b b b b b b b b b f 
        b b b b b b b b b b b b b b b f 
        f f b b b b b b b b b b b b b f 
        9 f f f f b b b b f f f f f f f 
        9 . 6 . f f f f f f 6 9 . 6 . 6 
        9 8 6 . 6 6 . 6 . . 6 9 . 6 9 6 
        . 8 6 9 6 6 . 6 9 . 6 9 8 6 9 8 
        . 8 6 9 6 6 8 6 9 . 6 . 8 6 9 8 
        6 . 6 9 6 . 8 6 9 8 6 . 8 6 . 8 
        6 9 6 9 6 . 8 . . 8 9 . 8 6 . 8 
        6 9 6 . . . 8 . . 8 9 . . . . 8 
        . 9 . . . . . . . 8 9 . . . . . 
        `)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    attemptJump()
})
function animateRun () {
    mainRunLeft = animation.createAnimation(ActionKind.Walking, 100)
    animation.attachAnimation(hero, mainRunLeft)
    mainRunLeft.addAnimationFrame(img`
        . . . . f f f f f f f . . . . . 
        . . . . f 8 8 8 8 8 f . . . . . 
        . . . . f 8 8 8 8 8 f . . . . . 
        . . . . f f 2 8 8 8 f . . . . . 
        . . . . f 8 8 8 8 8 f . . . . . 
        . . . . f 8 8 8 8 8 f . . . . . 
        . . . . f f f f f f f . . . . . 
        . . . . . f 1 1 1 f . . . . . . 
        . . . . . f 1 f f f f f f f . . 
        . . . . . f 1 1 1 f . . . . . . 
        . . . . . f 9 8 8 9 9 . . . . . 
        . . . . . 9 8 9 9 6 9 9 . . . . 
        . . . . . 8 9 9 8 8 9 6 . . . . 
        . . . . . 8 6 9 8 9 9 8 . . . . 
        . . . . . 9 6 9 9 9 9 8 . . . . 
        . . . . . 9 9 8 8 8 8 9 . . . . 
        `)
    mainRunLeft.addAnimationFrame(img`
        . . . f f f f f f f . . . . . . 
        . . . f 8 8 8 8 8 f . . . . . . 
        . . . f 8 8 8 8 8 f . . . . . . 
        . . . f f 2 8 8 8 f . . . . . . 
        . . . f 8 8 8 8 8 f . . . . . . 
        . . . f 8 8 8 8 8 f . . . . . . 
        . . . f f f f f f f . . . . . . 
        . . . . f 1 1 1 f . . . . . . . 
        . . . . f 1 f f f f f f f . . . 
        . . . . f 1 1 1 f . . . . . . . 
        . . . . f 9 9 8 8 8 . . . . . . 
        . . . . 9 6 6 9 9 8 8 . . . . . 
        . . . . 9 6 8 8 9 9 8 . . . . . 
        . . . . 9 6 8 9 9 9 9 . . . . . 
        . . . . 8 9 8 8 9 6 9 . . . . . 
        . . . . 8 8 8 9 6 6 9 . . . . . 
        `)
    mainRunLeft.addAnimationFrame(img`
        . . . . f f f f f f f . . . . . 
        . . . . f 8 8 8 8 8 f . . . . . 
        . . . . f 8 8 8 8 8 f . . . . . 
        . . . . f f 2 8 8 8 f . . . . . 
        . . . . f 8 8 8 8 8 f . . . . . 
        . . . . f 8 8 8 8 8 f . . . . . 
        . . . . f f f f f f f . . . . . 
        . . . . . f 1 1 1 f . . . . . . 
        . . . . . f 1 f f f f f f f . . 
        . . . . . f 1 1 1 f . . . . . . 
        . . . . . f 9 8 8 9 9 . . . . . 
        . . . . . 9 8 9 9 6 9 9 . . . . 
        . . . . . 8 9 9 8 8 9 6 . . . . 
        . . . . . 8 6 9 8 9 9 8 . . . . 
        . . . . . 9 6 9 9 9 9 8 . . . . 
        . . . . . 9 9 8 8 8 8 9 . . . . 
        `)
    mainRunLeft.addAnimationFrame(img`
        . . . f f f f f f f . . . . . . 
        . . . f 8 8 8 8 8 f . . . . . . 
        . . . f 8 8 8 8 8 f . . . . . . 
        . . . f f 2 8 8 8 f . . . . . . 
        . . . f 8 8 8 8 8 f . . . . . . 
        . . . f 8 8 8 8 8 f . . . . . . 
        . . . f f f f f f f . . . . . . 
        . . . . f 1 1 1 f . . . . . . . 
        . . . . f 1 f f f f f f f . . . 
        . . . . f 1 1 1 f . . . . . . . 
        . . . . f 9 9 8 8 8 . . . . . . 
        . . . . 9 6 6 9 9 8 8 . . . . . 
        . . . . 9 6 8 8 9 9 8 . . . . . 
        . . . . 9 6 8 9 9 9 9 . . . . . 
        . . . . 8 9 8 8 9 6 9 . . . . . 
        . . . . 8 8 8 9 6 6 9 . . . . . 
        `)
    mainRunRight = animation.createAnimation(ActionKind.Walking, 100)
    animation.attachAnimation(hero, mainRunRight)
    mainRunRight.addAnimationFrame(img`
        . . . . . f f f f f f f . . . . 
        . . . . . f 8 8 8 8 8 f . . . . 
        . . . . . f 8 8 8 8 8 f . . . . 
        . . . . . f 8 8 8 2 f f . . . . 
        . . . . . f 8 8 8 8 8 f . . . . 
        . . . . . f 8 8 8 8 8 f . . . . 
        . . . . . f f f f f f f . . . . 
        . . . . . . f 1 1 1 f . . . . . 
        . . f f f f f f f 1 f . . . . . 
        . . . . . . f 1 1 1 f . . . . . 
        . . . . . 9 9 8 8 9 f . . . . . 
        . . . . 9 9 6 9 9 8 9 . . . . . 
        . . . . 6 9 8 8 9 9 8 . . . . . 
        . . . . 8 9 9 8 9 6 8 . . . . . 
        . . . . 8 9 9 9 9 6 9 . . . . . 
        . . . . 9 8 8 8 8 9 9 . . . . . 
        `)
    mainRunRight.addAnimationFrame(img`
        . . . . . . f f f f f f f . . . 
        . . . . . . f 8 8 8 8 8 f . . . 
        . . . . . . f 8 8 8 8 8 f . . . 
        . . . . . . f 8 8 8 2 f f . . . 
        . . . . . . f 8 8 8 8 8 f . . . 
        . . . . . . f 8 8 8 8 8 f . . . 
        . . . . . . f f f f f f f . . . 
        . . . . . . . f 1 1 1 f . . . . 
        . . . f f f f f f f 1 f . . . . 
        . . . . . . . f 1 1 1 f . . . . 
        . . . . . . 8 8 8 9 9 f . . . . 
        . . . . . 8 8 9 9 6 6 9 . . . . 
        . . . . . 8 9 9 8 8 6 9 . . . . 
        . . . . . 9 9 9 9 8 6 9 . . . . 
        . . . . . 9 6 9 8 8 9 8 . . . . 
        . . . . . 9 6 6 9 8 8 8 . . . . 
        `)
    mainRunRight.addAnimationFrame(img`
        . . . . . f f f f f f f . . . . 
        . . . . . f 8 8 8 8 8 f . . . . 
        . . . . . f 8 8 8 8 8 f . . . . 
        . . . . . f 8 8 8 2 f f . . . . 
        . . . . . f 8 8 8 8 8 f . . . . 
        . . . . . f 8 8 8 8 8 f . . . . 
        . . . . . f f f f f f f . . . . 
        . . . . . . f 1 1 1 f . . . . . 
        . . f f f f f f f 1 f . . . . . 
        . . . . . . f 1 1 1 f . . . . . 
        . . . . . 9 9 8 8 9 f . . . . . 
        . . . . 9 9 6 9 9 8 9 . . . . . 
        . . . . 6 9 8 8 9 9 8 . . . . . 
        . . . . 8 9 9 8 9 6 8 . . . . . 
        . . . . 8 9 9 9 9 6 9 . . . . . 
        . . . . 9 8 8 8 8 9 9 . . . . . 
        `)
    mainRunRight.addAnimationFrame(img`
        . . . . . . f f f f f f f . . . 
        . . . . . . f 8 8 8 8 8 f . . . 
        . . . . . . f 8 8 8 8 8 f . . . 
        . . . . . . f 8 8 8 2 f f . . . 
        . . . . . . f 8 8 8 8 8 f . . . 
        . . . . . . f 8 8 8 8 8 f . . . 
        . . . . . . f f f f f f f . . . 
        . . . . . . . f 1 1 1 f . . . . 
        . . . f f f f f f f 1 f . . . . 
        . . . . . . . f 1 1 1 f . . . . 
        . . . . . . 8 8 8 9 9 f . . . . 
        . . . . . 8 8 9 9 6 6 9 . . . . 
        . . . . . 8 9 9 8 8 6 9 . . . . 
        . . . . . 9 9 9 9 8 6 9 . . . . 
        . . . . . 9 6 9 8 8 9 8 . . . . 
        . . . . . 9 6 6 9 8 8 8 . . . . 
        `)
}
function animateJumps () {
    // Because there isn't currently an easy way to say "play this animation a single time
    // and stop at the end", this just adds a bunch of the same frame at the end to accomplish
    // the same behavior
    mainJumpLeft = animation.createAnimation(ActionKind.Walking, 100)
    animation.attachAnimation(hero, mainJumpLeft)
    mainJumpLeft.addAnimationFrame(img`
        . . . . f f f f f f f . . . . . 
        . . . . f 8 8 8 8 8 f . . . . . 
        . . . . f 8 8 8 8 8 f . . . . . 
        . . . . f f 2 8 8 8 f . . . . . 
        . . . . f 8 8 8 8 8 f . . . . . 
        . . . . f 8 8 8 8 8 f . . . . . 
        . . . . f f f f f f f . . . . . 
        . . . . . f 1 1 1 f . . . . . . 
        . . . . . f 1 f 1 f . . . . . . 
        . . . . . f 1 f 1 f . . . . . . 
        . . . . . f 1 f 1 f . . . . . . 
        . . . . . f 1 1 1 f . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        `)
    mainJumpLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . f f f f f f f . . . . . 
        . . . . f 8 8 8 8 8 f . . . . . 
        . . . . f 8 8 8 8 8 f . . . . . 
        . . . . f f 2 8 8 8 f . . . . . 
        . . . . f 8 8 8 8 8 f . . . . . 
        . . . . f 8 8 8 8 8 f . . . . . 
        . . . . f f f f f f f . . . . . 
        . . . . . f 1 1 1 f . . . . . . 
        . . . . . f 1 f 1 f . . . . . . 
        . . . . . f 1 f 1 f . . . . . . 
        . . . . . f 1 f 1 f . . . . . . 
        . . . . . f 1 1 1 f . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        `)
    for (let index = 0; index < 30; index++) {
        mainJumpLeft.addAnimationFrame(img`
            . . . . f f f f f f f . . . . . 
            . . . . f 8 8 8 8 8 f . . . . . 
            . . . . f 8 8 8 8 8 f . . . . . 
            . . . . f f 2 8 8 8 f . . . . . 
            . . . . f 8 8 8 8 8 f . . . . . 
            . . . . f 8 8 8 8 8 f . . . . . 
            . . . . f f f f f f f . . . . . 
            . . . . . f 1 1 1 f . . . . . . 
            . . . . . f 1 f 1 f . . . . . . 
            . . . . . f 1 f 1 f . . . . . . 
            . . . . . f 1 f 1 f . . . . . . 
            . . . . . f 1 1 1 f . . . . . . 
            . . . . . f f f f f . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
    }
    mainJumpRight = animation.createAnimation(ActionKind.Walking, 100)
    animation.attachAnimation(hero, mainJumpRight)
    mainJumpRight.addAnimationFrame(img`
        . . . . . f f f f f f f . . . . 
        . . . . . f 8 8 8 8 8 f . . . . 
        . . . . . f 8 8 8 8 8 f . . . . 
        . . . . . f 8 8 8 2 f f . . . . 
        . . . . . f 8 8 8 8 8 f . . . . 
        . . . . . f 8 8 8 8 8 f . . . . 
        . . . . . f f f f f f f . . . . 
        . . . . . . f 1 1 1 f . . . . . 
        . . . . . . f 1 f 1 f . . . . . 
        . . . . . . f 1 f 1 f . . . . . 
        . . . . . . f 1 f 1 f . . . . . 
        . . . . . . f 1 1 1 f . . . . . 
        . . . . . . f f f f f . . . . . 
        . . . . . . . . f . . . . . . . 
        . . . . . . . . f . . . . . . . 
        . . . . . . . . f . . . . . . . 
        `)
    mainJumpRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f f . . . . 
        . . . . . f 8 8 8 8 8 f . . . . 
        . . . . . f 8 8 8 8 8 f . . . . 
        . . . . . f 8 8 8 2 f f . . . . 
        . . . . . f 8 8 8 8 8 f . . . . 
        . . . . . f 8 8 8 8 8 f . . . . 
        . . . . . f f f f f f f . . . . 
        . . . . . . f 1 1 1 f . . . . . 
        . . . . . . f 1 f 1 f . . . . . 
        . . . . . . f 1 f 1 f . . . . . 
        . . . . . . f 1 f 1 f . . . . . 
        . . . . . . f 1 1 1 f . . . . . 
        . . . . . . f f f f f . . . . . 
        . . . . . . . . f . . . . . . . 
        . . . . . . . . f . . . . . . . 
        `)
    for (let index = 0; index < 30; index++) {
        mainJumpRight.addAnimationFrame(img`
            . . . . . f f f f f f f . . . . 
            . . . . . f 8 8 8 8 8 f . . . . 
            . . . . . f 8 8 8 8 8 f . . . . 
            . . . . . f 8 8 8 2 f f . . . . 
            . . . . . f 8 8 8 8 8 f . . . . 
            . . . . . f 8 8 8 8 8 f . . . . 
            . . . . . f f f f f f f . . . . 
            . . . . . . f 1 1 1 f . . . . . 
            . . . . . . f 1 f 1 f . . . . . 
            . . . . . . f 1 f 1 f . . . . . 
            . . . . . . f 1 f 1 f . . . . . 
            . . . . . . f 1 1 1 f . . . . . 
            . . . . . . f f f f f . . . . . 
            . . . . . . . . f . . . . . . . 
            . . . . . . . . f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
    }
}
function animateCrouch () {
    mainCrouchLeft = animation.createAnimation(ActionKind.Walking, 100)
    animation.attachAnimation(hero, mainCrouchLeft)
    mainCrouchLeft.addAnimationFrame(img`
        . . . . . f f f f f f f . . . . 
        . . . . . f . . f . . f . . . . 
        . . . . . f . . f . . f . . . . 
        . . . . . f f d f d f f . . . . 
        . . . . . f . . f . . f . . . . 
        . . . . . f . . f . . f . . . . 
        . . . . . f f f f f f f . . . . 
        . . . . . . f . . . f . . . . . 
        . . . . . f f . . . f f . . . . 
        . . . . f . f . . . f . f . . . 
        . . . . f . f . . . f . f . . . 
        . . . . f . f . . . f . f . . . 
        . . . . . . f f f f f . . . . . 
        . . . . . . f . . . f . . . . . 
        . . . . . . f . . . f . . . . . 
        . . . . . . f . . . f . . . . . 
        `)
    mainCrouchRight = animation.createAnimation(ActionKind.Walking, 100)
    animation.attachAnimation(hero, mainCrouchRight)
    mainCrouchRight.addAnimationFrame(img`
        . . . . . f f f f f f f . . . . 
        . . . . . f . . f . . f . . . . 
        . . . . . f . . f . . f . . . . 
        . . . . . f f d f d f f . . . . 
        . . . . . f . . f . . f . . . . 
        . . . . . f . . f . . f . . . . 
        . . . . . f f f f f f f . . . . 
        . . . . . . f . . . f . . . . . 
        . . . . . f f . . . f f . . . . 
        . . . . f . f . . . f . f . . . 
        . . . . f . f . . . f . f . . . 
        . . . . f . f . . . f . f . . . 
        . . . . . . f f f f f . . . . . 
        . . . . . . f . . . f . . . . . 
        . . . . . . f . . . f . . . . . 
        . . . . . . f . . . f . . . . . 
        `)
}
function clearGame () {
    for (let value of sprites.allOfKind(SpriteKind.Bumper)) {
        value.destroy()
    }
    for (let value2 of sprites.allOfKind(SpriteKind.Coin)) {
        value2.destroy()
    }
    for (let value3 of sprites.allOfKind(SpriteKind.Goal)) {
        value3.destroy()
    }
    for (let value4 of sprites.allOfKind(SpriteKind.Flier)) {
        value4.destroy()
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Flier, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprite.say("Ow!", invincibilityPeriod * 1.5)
    music.powerDown.play()
    pause(invincibilityPeriod * 1.5)
})
function createEnemies () {
    // enemy that moves back and forth
    for (let value5 of tiles.getTilesByType(myTiles.tile4)) {
        bumper = sprites.create(img`
            ................................
            ................................
            ................................
            ..........bbbbbbbbbbbbb.........
            ........bbfffffffffffffb........
            ........bbfffffffffffffb........
            .......bffffffffffffffffbb......
            ....bb.bffffffffffffffffbb.bb...
            ......bbddddddddddddddddbbb.....
            ......bbddddddddddddddddbbb.....
            .....455bbdfffffddffffdb5554....
            .....55455bffdddddddffb54455....
            .....bbbbbbbbfffffffbbbbbbbb....
            .....bbbbbbbbfffffffbbbbbbbb....
            .....fffbbbbbbbfffbbbbbbffff....
            .....fff................ffff....
            `, SpriteKind.Bumper)
        tiles.placeOnTile(bumper, value5)
        tiles.setTileAt(value5, myTiles.tile0)
        bumper.ay = gravity
        if (Math.percentChance(50)) {
            bumper.vx = Math.randomRange(30, 60)
        } else {
            bumper.vx = Math.randomRange(-60, -30)
        }
    }
    // enemy that flies at player
    for (let value6 of tiles.getTilesByType(myTiles.tile7)) {
        flier = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f f f f f f f . . . . 
            . . . . f 4 4 4 4 4 4 4 f . . . 
            . . . f 4 5 5 4 4 4 5 5 4 f . . 
            . f . f 4 4 4 5 4 5 4 4 4 f . f 
            . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
            . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
            . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
            . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
            . . . f 4 4 5 5 5 5 5 4 4 f . . 
            . . . . f 4 5 4 4 4 5 4 f . . . 
            . . . . . f f f f f f f . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Flier)
        tiles.placeOnTile(flier, value6)
        tiles.setTileAt(value6, myTiles.tile0)
        animation.attachAnimation(flier, flierFlying)
        animation.attachAnimation(flier, flierIdle)
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(hero.isHittingTile(CollisionDirection.Bottom))) {
        hero.vy += 80
    }
})
function showInstruction (text: string) {
    game.showLongText(text, DialogLayout.Bottom)
    music.baDing.play()
    info.changeScoreBy(1)
}
function initializeHeroAnimations () {
    animateRun()
    animateIdle()
    animateCrouch()
    animateJumps()
}
function createPlayer (player2: Sprite) {
    player2.ay = gravity
    scene.cameraFollowSprite(player2)
    controller.moveSprite(player2, 100, 0)
    player2.z = 5
    info.setLife(3)
    info.setScore(0)
}
function initializeLevel (level: number) {
    effects.clouds.startScreenEffect()
    playerStartLocation = tiles.getTilesByType(myTiles.tile6)[0]
    tiles.placeOnTile(hero, playerStartLocation)
    tiles.setTileAt(playerStartLocation, myTiles.tile0)
    createEnemies()
    spawnGoals()
}
function hasNextLevel () {
    return currentLevel != levelCount
}
function spawnGoals () {
    for (let value7 of tiles.getTilesByType(myTiles.tile5)) {
        coin = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . f f 5 5 5 5 f f . . . . 
            . . . . f 5 5 5 5 5 5 f . . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . . f 5 5 5 5 5 5 f . . . . 
            . . . . f f 5 5 5 5 f f . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Coin)
        tiles.placeOnTile(coin, value7)
        animation.attachAnimation(coin, coinAnimation)
        animation.setAction(coin, ActionKind.Walking)
        tiles.setTileAt(value7, myTiles.tile0)
    }
}
let heroFacingLeft = false
let coin: Sprite = null
let playerStartLocation: tiles.Location = null
let flier: Sprite = null
let bumper: Sprite = null
let mainCrouchRight: animation.Animation = null
let mainCrouchLeft: animation.Animation = null
let mainJumpRight: animation.Animation = null
let mainJumpLeft: animation.Animation = null
let mainRunRight: animation.Animation = null
let mainRunLeft: animation.Animation = null
let flierIdle: animation.Animation = null
let flierFlying: animation.Animation = null
let mainIdleRight: animation.Animation = null
let mainIdleLeft: animation.Animation = null
let doubleJumpSpeed = 0
let canDoubleJump = false
let coinAnimation: animation.Animation = null
let currentLevel = 0
let levelCount = 0
let gravity = 0
let pixelsToMeters = 0
let invincibilityPeriod = 0
let hero: Sprite = null
hero = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 1 1 1 2 2 2 2 2 2 2 2 
    2 2 2 2 2 1 1 1 1 1 2 2 2 2 2 2 
    2 2 2 2 2 1 1 1 1 1 1 2 2 2 2 2 
    2 2 2 2 2 1 1 1 1 1 1 1 2 2 2 2 
    2 2 2 2 2 1 1 1 1 1 1 2 2 2 2 2 
    2 2 2 2 2 1 1 1 1 1 2 2 2 2 2 2 
    2 2 2 2 2 1 1 1 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
// how long to pause between each contact with a
// single enemy
invincibilityPeriod = 600
pixelsToMeters = 30
gravity = 9.81 * pixelsToMeters
scene.setBackgroundImage(img`
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    `)
initializeAnimations()
createPlayer(hero)
levelCount = 8
currentLevel = 0
setLevelTileMap(currentLevel)
giveIntroduction()
// set up hero animations
game.onUpdate(function () {
    if (hero.vx < 0) {
        heroFacingLeft = true
    } else if (hero.vx > 0) {
        heroFacingLeft = false
    }
    if (hero.isHittingTile(CollisionDirection.Top)) {
        hero.vy = 0
    }
    if (controller.down.isPressed()) {
        if (heroFacingLeft) {
            animation.setAction(hero, ActionKind.Walking)
        } else {
            animation.setAction(hero, ActionKind.Walking)
        }
    } else if (hero.vy < 20 && !(hero.isHittingTile(CollisionDirection.Bottom))) {
        if (heroFacingLeft) {
            animation.setAction(hero, ActionKind.Walking)
        } else {
            animation.setAction(hero, ActionKind.Walking)
        }
    } else if (hero.vx < 0) {
        animation.setAction(hero, ActionKind.Walking)
    } else if (hero.vx > 0) {
        animation.setAction(hero, ActionKind.Walking)
    } else {
        if (heroFacingLeft) {
            animation.setAction(hero, ActionKind.Walking)
        } else {
            animation.setAction(hero, ActionKind.Walking)
        }
    }
})
// Flier movement
game.onUpdate(function () {
    for (let value8 of sprites.allOfKind(SpriteKind.Flier)) {
        if (Math.abs(value8.x - hero.x) < 60) {
            if (value8.x - hero.x < -5) {
                value8.vx = 25
            } else if (value8.x - hero.x > 5) {
                value8.vx = -25
            }
            if (value8.y - hero.y < -5) {
                value8.vy = 25
            } else if (value8.y - hero.y > 5) {
                value8.vy = -25
            }
            animation.setAction(value8, ActionKind.Walking)
        } else {
            value8.vy = -20
            value8.vx = 0
            animation.setAction(value8, ActionKind.Walking)
        }
    }
})
// Reset double jump when standing on wall
game.onUpdate(function () {
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        canDoubleJump = true
    }
})
// bumper movement
game.onUpdate(function () {
    for (let value9 of sprites.allOfKind(SpriteKind.Bumper)) {
        if (value9.isHittingTile(CollisionDirection.Left)) {
            value9.vx = Math.randomRange(30, 60)
        } else if (value9.isHittingTile(CollisionDirection.Right)) {
            value9.vx = Math.randomRange(-60, -30)
        }
    }
})
