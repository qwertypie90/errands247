passport.use(new GoogleStrategy({
    clientID: config.get('383855380712-h8iai93lvm05or36gaq6kklscvsm7696.apps.googleusercontent.com')
    clientSecret: config.get('_HS0IxWlFmyg8tfQFJiUx7YO'),
    callbackURL: config.get('http://localhost:8080/')
    accessType: 'offline'
}, (accessToken, refreshToken, profile, cb) => {
    // Extract the minimal profile information we need from the profile object
    // provided by Google
    cb(null, extractProfile(profile));
}));

passport.serializeUser((user, cb) => {
    cb(null, user);
});
passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});
