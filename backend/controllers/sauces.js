exports.getAllSauces = (req, res, next) => {
    console.log(req.body)
    res.status(200).send({
        message : "Récupération de toutes les sauces"
    })
};

exports.getSauce = (req, res, next) => {
    console.log(req.body)
    res.status(200).send({
        message : "Récupération d'une sauce"
    })
}

exports.postSauce = (req, res, next) => {
    const image = req.file;
    const sauce = JSON.parse(req.body.sauce);
    console.log("postSauce", sauce, image);
    res.status(201).send({
        message : "Création d'une sauce"
    })
}

exports.putSauce = (req, res, next) => {
    console.log(req.body)
    res.status(200).send({
        message : "Modification d'une sauce"
    })
}

exports.deleteSauce = (req, res, next) => {
    console.log(req.body)
    res.status(204).send({
        message : "Suppression d'une sauce"
    })
}

exports.postLikeSauce = (req, res, next) => {
    console.log(req.body)
    res.status(200).send({
        message : "Like ou Dislike d'une sauce"
    })
}

