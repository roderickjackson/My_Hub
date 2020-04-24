/**
 * 
 */

exports.findDocumentByKey = async (Model, key) => {
	try{
		await Model.findOne({key}).lean()
	}
	catch(error){
		throw new Error(error)
	}
}

exports.saveNewDocument = async (newInstanceOfModel) => {
	try{
		await newInstanceOfModel.save
	}
	catch(error){
		throw new Error(error)
	}
}
