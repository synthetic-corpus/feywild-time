import * as uuid from 'uuid'

import { FeywildCalendar, FeywildUpdate, FeyImageUpdate } from '../models/Feywild'
import { FeywildSetup } from '../requests/createFeywild'
import { createLogger } from '../utils/logger'

const logger = createLogger('Logic Layer')
/* Database Layer */
import { FeywildDB } from '../03dataLayer/databaseAccess'
import { S3Access } from '../03dataLayer/s3Access'
const feywildDB = new FeywildDB()
const s3Access = new S3Access()

export async function createFeywild(
    feywildSetup: FeywildSetup, 
    userID: string
    ): Promise<object>{
    const feywildID = uuid.v4()
    const createdAt = (new Date()).toString();
    logger.info("*** Logic Layer ***")
    logger.info(`Creating a FeyWild Calander at ${createdAt}`)
    const feyZone: FeywildCalendar = {
        userID,
        feywildID,
        createdAt,
        ...feywildSetup
    }
    try{
        return await feywildDB.createFeywild(feyZone)
    }catch{
        return {"error": `Could not create with new Calendar`,"Input": feyZone}
    }
    
}

export async function retrieveFeywild(
    feywildID: string, 
    userID: string
    ): Promise<object>{
    try{
        const result =  await feywildDB.retrieveFeywild(feywildID, userID)
        if(result.hasOwnProperty('feyImage')){
            return await s3Access.addSignedURL(result)
        }else{
            return result
        }
    }catch{
        return {"error": `Could not retrieve!`,feywildID,userID}
    }
    
}

export async function retrieveAllFeywilds(
    userID: string
    ): Promise<object[]>{
    try{
        const results = await feywildDB.retrieveAllFeywilds(userID)
        const mapped: Promise<FeywildCalendar[]> = Promise.all(results.map(async (element)=>{
        if(element.feyImage){
            element = await s3Access.addSignedURL(element as FeywildCalendar)
            return element
        }else{
            return element
        }
    })) as Promise<FeywildCalendar[]>
    return mapped
    }catch{
        return [{"error": `Could not retrieve!`,userID}]
    }
    
}
export async function updateFeywild(
    feywildUpdate: FeywildUpdate, 
    feywildID: string, 
    userID: string): Promise<object>{
    try{
        return await feywildDB.updateFeywild(feywildUpdate, feywildID, userID)
    }catch{
        return {"error":"Could Not update!",feywildUpdate,feywildID,userID}
    }
    
}

export async function deleteFeywild(
    feywildID: string, 
    userID: string
    ): Promise<object>{
    try{
        return await feywildDB.deleteFeywild(feywildID, userID)
    }catch {
        return {"error":"Could Not Delete!",feywildID,userID}
    }
    
}

export async function addFeywildImage(
    feywildImage: string,
    feywildID: string,
    userID: string
    ): Promise<FeyImageUpdate>{
        const feyImageFull = feywildID + "-" +feywildImage // Ensures uniqueness of name within S3 Bucket.
        const updateObject: boolean = await feywildDB.updateImage(feyImageFull, feywildID, userID)
        const uploadURL = await s3Access.getUploadURL(feyImageFull)
        return {
            uploadURL,
            success: updateObject
        }
    }