const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// create schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  handle: {   // a url friendly value to get to the profile - i.e. - http://test.com/profiles/myProfileHandle
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: true, // will be from a dropdown
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String,
  },
  githubUsername: {
    type: String,

  },
  experience: [{
    title: {
      type: String,
      required: true
    },
    company: {
      type: String,
      required: true
    },
    location: {
      type: String,
    },
    fromDate: {
      type: Date,
      required: true
    },
    toDate: {
      type: Date,
    },
    currentlyEmployed: {
      type: Boolean,
      default: false
    },
    description: {
      type: String
    }

  }],
  education: [{
    title: {
      type: String,
      required: true
    },
    school: {
      type: String,
      required: true
    },
    degree: {
      type: String,
      required: true
    },
    fieldOfStudy: {
      type: String,
      required: true
    },
    location: {
      type: String,
    },
    fromDate: {
      type: Date,
      required: true
    },
    toDate: {
      type: Date,
    },
    currentlyEnrolled: {
      type: Boolean,
      default: false
    },
    description: {
      type: String
    }
  }],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    },
    linkedin: {
      type: String
    },
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);