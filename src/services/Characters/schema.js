import Mongoose from "mongoose";
const { Schema, model } = Mongoose;

const characterSchema = new Schema (
    {
editors: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
characterName: { type: String},
race: { type: String},
experience: { type: Number},
class: { type: String },
level: { type: String },
armorClass: { type: String},
attackBonus: { type: String},
abilities: [ {
     abilityName: String,
     details: String,
 } ],
hitPoints: { 
    maxHitPoints: Number,
    currentHitPoints: Number,
},
money: { 
    pp: Number,
    gp: Number,
    sp: Number,
    cp: Number
    },
characterImage:{ type: String },
equipment: [{ 
    equipmentName: String,
    type: String,
    damage: String,
    armorClass: String,
    armorBonus: String,
    information: String,
    weight: Number,
} ],
savingThrows: { 
    deathPoison: Number,
    wands: Number,        
    paralysisPetrification: Number,        
    dragonBreath: Number,        
    spells: Number,         
    },
statistics: { 
    strength: Number,
    dexterity: Number,        
    constitution: Number,        
    wisdom: Number,        
    intelligence: Number,        
    charisma: Number,        
    },
},
 { timestamps: true }
)



export default model("Character", characterSchema)