const Sauce = require('../models/sauce');
const fs = require('fs');                

// Afficher toutes les sauces
exports.getAllSauce = (req, res, next) => {
	Sauce.find()
		.then(sauces => res.status(200).json(sauces))
		.catch(error => res.status(404).jsons({ error: 'Oups! Ça n\'a pas marché.' }));
};


// Afficher une sauce
exports.getOneSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id })
		.then(sauce => res.status(200).json(sauce))
		.catch((error) => {
			console.log(error);
			res.status(404).json({ error: 'Oups! Ça n\'a pas marché.' })
		});
};

// Création d'une nouvelle sauce
exports.postSauce = (req, res, next) => {
	const sauceObject = JSON.parse(req.body.sauce);
	const sauce = new Sauce({
		...sauceObject,
		imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
		likes: 0,
		dislikes: 0,
	});
    sauce.save()
		.then(() => res.status(201).json({ message: 'Nouvelle sauce ajoutée!' }))
		.catch(error => res.status(400).json({ error: 'Oups! Ça n\'a pas marché.' })); // ajouter msg d'erreur
}

// Modifier une sauce
exports.putSauce = (req, res, next) => {
	const sauceObject = req.file ? // const sauceObject = Ya t'il une image ? {si oui, faire ceci} : {sinon faire cela}
		{
			...JSON.parse(req.body.sauce),
			imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
		} : { ...req.body };
	Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
		.then(() => res.status(201).json({ message: 'Sauce modifiée' }))
		.catch(error => res.status(400).json({ error: 'Oups! Ça n\'a pas marché.' }));
}

// Supprimer une sauce
exports.deleteSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id })
		.then(sauce => {
			const filename = sauce.imageUrl.split('/images/')[1];
			fs.unlink(`images/${filename}`, () => {
				Sauce.deleteOne({ _id: req.params.id })
					.then(() => res.status(201).json({ message: 'Sauce supprimée' }))
					.catch(error => res.status(400).json({ error: 'Oups! Ça n\'a pas marché.' }));
			});
			/*
			// delete image
			function handleFileSelect(evt) {
				const files = evt.target.files; // FileList object
				// Loop through the FileList and render image files as thumbnails.
				for (const i = 0, f; f = files[i]; i++) {
					// Only process image files.
					if (!f.type.match('image.*')) {
						continue;
					}
					const reader = new FileReader();
					// Closure to capture the file information.
					reader.onload = (function(theFile) {
						return function(e) {
							// Render thumbnail.
							const span = document.createElement('span');
							span.innerHTML = ['<div style="display:inline-block; width:200px; height:220px; line-height: 220px; vertical-align:top; border:1px solid #CCCCCC; text-align:center; margin: 10px 10px 10px 10px; padding: 5px 5px 5px 5px; box-shadow: 5px 5px 8px #aaa;"><p><img class="thumb" src="', e.target.result, '" title="', 
							escape(theFile.name), '" width="150px"/></p><p><a href="#" title="Supprimer" id="deleteFiles"><input type="hidden" value="fileName" name="fileName" class="fileName"><span class="heydings_icons_3" style="float:right;">X</span></a></p></div>'].join('');
							document.getElementById('list').insertBefore(span, null);
						};
					})(f);
					// Read in the image file as a data URL.
					reader.readAsDataURL(f);
				}
			}
			document.getElementById('files').addEventListener('change', handleFileSelect, false);
			$("#files").change(function(){
					var fileName = $("#fileName").val();
				alert(fileName);
			});
			*/
		})
		.catch(error => res.status(400).json({ error: 'Oups! Ça n\'a pas marché.' }));
}

// Like/Dislike
exports.postLikeSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id })
		.then(sauce => {
			switch (req.body.like) {
				case -1: // Cas dislike
					sauce.dislikes = sauce.dislikes + 1;
					sauce.usersDisliked.push(req.body.userId);
					sauceObject = {
						"dislikes": sauce.dislikes,
						"usersDisliked": sauce.usersDisliked
					}
					break;
				case +1: // Cas like
					sauce.likes = sauce.likes + 1;
					sauce.usersLiked.push(req.body.userId);
					sauceObject = {
						"likes": sauce.likes,
						"usersLiked": sauce.usersLiked
					}
					break;
				case 0: // pas de like, pas de de dislike => Vérification 
					if (sauce.usersDisliked.find(user => user === req.body.userId)) {
						sauce.usersDisliked = sauce.usersDisliked.filter(user => user !== req.body.userId);
						sauce.dislikes = sauce.dislikes - 1;
						sauceObject = {
							"dislikes": sauce.dislikes,
							"usersDisliked": sauce.usersDisliked
						}
					} else {
						sauce.usersLiked = sauce.usersLiked.filter(user => user !== req.body.userId);
						sauce.likes = sauce.likes - 1;
						sauceObject = {
							"likes": sauce.likes,
							"usersLiked": sauce.usersLiked
						}
					}
					break;
				default:
					return res.status(500).json({ error });
			}
			Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
				.then(() => res.status(200).json({ message: 'Sauce liké !' }))
				.catch(error => res.status(400).json({ error }));
		})
		.catch(() => res.status(400).json({ error: 'Sauce non trouvée !' }));
}

