import express from "express";
import { adminAuth } from "../../middlewares/adminAuth.js";
import authorizationMiddle from "../../middlewares/authorization.js";
import { gameOwnerAuth } from "../../middlewares/gameOwnerAuth.js";
import CharacterModel from "./schema.js"
import FCG from "fantasy-content-generator";

const characterRouter = express.Router() 


characterRouter
//gets all the characters currently in the database
.get("/", authorizationMiddle, adminAuth, async (req, res, next) => {
    try {
        const characters = await CharacterModel.find({});
        if(characters) {
            res.send(characters)
        }
    } catch(error) {
        console.log(error)
        res.status(400).send(error)
    }
  })

//create a new Character 
.post("/", authorizationMiddle, async (req, res, next) => {
  try {

  const randomName = FCG.Names.generate();
      const body = {
          editors : [req.user._id],
          characterName : randomName.name,
          race : "",
          experience : 0,
          class : "",
          level : 1,
          armorClass : 10,
          attackBonus : 1,
          hitPoints: {
              maxHitPoints: 0,
              currentHitPoints: 0,
          },
          money: {
            pp: 0,
            gp: 0,
            sp: 0,
            cp: 0
          },
          savingThrows: {
            deathPoison: 0,
            wands: 0,        
            paralysisPetrification: 0,        
            dragonBreath: 0,        
            spells: 0, 
          },
          statistics: {
            strength: 10,
            dexterity: 10,        
            constitution: 10,        
            wisdom: 10,        
            intelligence: 10,        
            charisma: 10,  
          }
      }

    const newCharacter = new CharacterModel(body);
    const { _id } = await newCharacter.save();

      res.status(201).send({_id});    
  } catch(error) {
    console.log(error)
      res.status(400).send(error)
  }
  })



export default characterRouter