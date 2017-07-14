var {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema
} = require('graphql');

import Db from './../database/db';

const Author = new GraphQLObjectType({
    name: "Author",
    description: "This is a bloody author",
    fields: () => {
        return {
            id: {
                type: GraphQLID,
                resolve(author){
                    return author.id;
                }
            },
            firstName: {
                type: GraphQLString,
                resolve(author){
                    return author.firstName;
                }
            },
            lastName: {
                type: GraphQLString,
                resolve(author){
                    return author.lastName;
                }
            },
            email: {
                type: GraphQLString,
                resolve(author){
                    return author.email;
                }
            },
            posts: {
                type: new GraphQLList(Post),
                resolve(author) {
                    return author.getPosts();
                }
            }
        }
    }
});

const Post = new GraphQLObjectType({
    name: "Post",
    description: "This is a post",
    fields: () => {
        return {
            id: {
                type: GraphQLID,
                resolve(post){
                    return post.id;
                }
            },
            title: {
                type: GraphQLString,
                resolve(post){
                    return post.title;
                }
            },
            content: {
                type: GraphQLString,
                resolve(post){
                    return post.content;
                }
            },
            author: {
                type: Author,
                resolve(post) {
                    return post.getAuthor();
                }
            }
        }
    }
});

const query = new GraphQLObjectType({
    name: "Query",
    description: "This is a root Query",
    fields: () => {
        return {
            authors: {
                type: new GraphQLList(Author),
                args: {
                    id: {
                        type: GraphQLInt
                    },
                    email: {
                        type: GraphQLString
                    }
                },
                // root for root query
                resolve(_, args){
                    return Db.models.author.findAll({where: args});
                }
            },
            posts: {
                type: new GraphQLList(Post),
                args: {
                    title: {
                        type: GraphQLString
                    },
                    content: {
                        type: GraphQLString
                    }
                },
                resolve(_, args){
                    return Db.models.post.findAll({where: args});
                }

            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: "Mutation",
    description: "Create Stuff",
    fields() {
        return {
            createAuthor: {
                type: Author,
                args: {
                    firstName: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    lastName: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    email: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(_, args){
                    return Db.models.author.create({
                        firstName: args.firstName,
                        lastName: args.lastName,
                        email: args.email.toLowerCase()
                    });
                }
            },
            deleteAuthor: {
                type: Author,
                args: {
                    id: {
                        type: GraphQLInt
                    }
                },
                resolve: (_, args) => {
                    // raw: true gibt nur die gefundene daten zuruck
                    return Db.models.author.find({where: {id: args.id}, raw: true}).then(function (embed) {
                        Db.models.author.destroy({where: {id: args.id}});
                        return embed;
                    }).catch(function () {
                        console.log("Could not delete author");
                    }).then(function () {
                        return Db.models.author.findAll();
                    });

                }
            },
            //query authors{authors{id firstName lastName email}}
            updateAuthor: {
                type: Author,
                args: {
                        id: {
                            type: GraphQLInt
                        },
                        firstName: {
                            type: GraphQLString
                        },
                        lastName: {
                            type: GraphQLString
                        },
                        email: {
                            type: GraphQLString
                        }
                },
                resolve: (_, args) => {
                   return Db.models.author.update({
                            firstName: args.firstName,
                            lastName: args.lastName,
                            email: args.email
                        }, {
                            where: {id: args.id}})
                       .then(function () {
                            return Db.models.author.find({where: {id: args.id}, raw: true})
                                .then(function (embed) {
                                console.log(embed);
                                return embed;
                            })
                    });
                }
            }
        }
    },
});

const Schema = new GraphQLSchema({
    query: query,
    mutation: mutation
});

module.exports = Schema;