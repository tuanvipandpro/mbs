import personModel from '../model/person'

module.exports = {
  getPersons: async (req, res) => {
    const filter = {}
    const sort = {}

    personModel.find(filter).sort(sort)
      .then(response => {
        res.status(200).json(response)
      })
      .catch(err => {
        res.status(500).json({error : e, msg: 'Get Markets Error !!!'})
      })
  },
  createPerson: async (req, res) => {

  },
  updatePerson: async () => {

  },
  deletePerson: async () => {

  }
}