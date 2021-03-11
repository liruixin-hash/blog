// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Gridsome',
  plugins: [
    {
      use: '@gridsome/source-strapi',
      options: {
        apiURL: 'http://106.75.126.221:1337',
        queryLimit: 100, // Defaults to 100
        contentTypes: ['menu','posts','userlist','follows','my-infos'],
        // singleTypes: ['impressum'],
        // Possibility to login with a Strapi user,
        // when content types are not publicly available (optional).
        // loginData: {
        //   identifier: '',
        //   password: ''
        // }
      }
    }
  ],
  templates:{
    StrapiUserlist:[
      {
        path:'/social/details/:id',
        component:'./src/templates/social/Details.vue'
      }
    ],
    StrapiPosts:[
      {
        path:'/blog/details/:id',
        component:'./src/templates/blog/Details.vue'
      }
    ]
  }
 
}
