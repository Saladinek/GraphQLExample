/**
 * Created by michal.svancar on 08.06.2017.
 */

import Db from './../database/db';

export const resolvers = {
    Author: {
        posts: {
            resolve(author) {
                return author.getPosts();
            }
        }
    },
    Post: {
        author: {
            resolve(post) {
                return post.getAuthor();
            }
        }
    },
    Query: {
        authors: (_) => {
                return Db.models.author.findAll();
        },
        author: (_, args) => {
            return Db.models.author.find({where: {id: args.id}});
        }
    },
    Mutation: {
        createAuthor: (_, args) => {
            return Db.models.author.create({
                firstName: args.firstName,
                lastName: args.lastName,
                email: args.email.toLowerCase()
            });
        },
        updateAuthor: (_, args) => {
            return Db.models.author.update({
                firstName: args.firstName,
                lastName: args.lastName,
                email: args.email
            }, {
                where: {id: args.id}
            })
                .then(function () {
                    return Db.models.author.find({where: {id: args.id}, raw: true})
                        .then(function (embed) {
                            console.log(embed);
                            return embed;
                        })
                });
        },
        deleteAuthor: (_, args) => {
            return Db.models.author.find({where: {id: args.id}, raw: true}).then(function (embed) {
                Db.models.author.destroy({where: {id: args.id}});
                return embed;
            }).catch(function () {
                console.log("Could not delete author");
            });
        }
    }
};


