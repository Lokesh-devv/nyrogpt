const createShadows = (colors) => ({

  card:{

    shadowColor:colors.shadow,

    shadowOffset:{

      width:0,

      height:4,

    },

    shadowOpacity:0.25,

    shadowRadius:8,

    elevation:6,

  }

});

export default createShadows;
