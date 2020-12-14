import { User, Rotas } from "@/models"

export default {
  users: [
    {
      userId: 1,
      user: "John Smith"
    },
    {
      userId: 2,
      user: "Ann Doe"
    },
    {
      userId: 3,
      user: "Nicole Woo"
    },
    {
      userId: 4,
      user: "Bo Derek"
    },
    {
      userId: 5,
      user: "Titan Cox"
    },
    {
      userId: 6,
      user: "Peter Pan"
    },
    {
      userId: 7,
      user: "Jake Smith"
    },
    {
      userId: 8,
      user: "Blake Dee"
    },
    {
      userId: 9,
      user: "Joana Li"
    },
    {
      userId: 10,
      user: "Beef Patty"
    }
  ].map(user => new User(user)),
  rotas: [
    {
      rotaID: 11,
      period: {
        startDate: "2020-11-01",
        endDate: "2020-11-10"
      },
      rota: [
        {
          userId: 1,
          type: "morning",
          date: "2020-11-01"
        },
        {
          userId: 10,
          type: "afternoon",
          date: "2020-11-01"
        },
        {
          userId: 2,
          type: "morning",
          date: "2020-11-02"
        },
        {
          userId: 9,
          type: "afternoon",
          date: "2020-11-02"
        },
        {
          userId: 3,
          type: "morning",
          date: "2020-11-03"
        },
        {
          userId: 8,
          type: "afternoon",
          date: "2020-11-03"
        },
        {
          userId: 4,
          type: "morning",
          date: "2020-11-04"
        },
        {
          userId: 6,
          type: "afternoon",
          date: "2020-11-04"
        },
        {
          userId: 5,
          type: "morning",
          date: "2020-11-05"
        },
        {
          userId: 7,
          type: "afternoon",
          date: "2020-11-05"
        },
        {
          userId: 6,
          type: "morning",
          date: "2020-11-06"
        },
        {
          userId: 3,
          type: "afternoon",
          date: "2020-11-06"
        },
        {
          userId: 7,
          type: "morning",
          date: "2020-11-07"
        },
        {
          userId: 2,
          type: "afternoon",
          date: "2020-11-07"
        },
        {
          userId: 8,
          type: "morning",
          date: "2020-11-08"
        },
        {
          userId: 1,
          type: "afternoon",
          date: "2020-11-08"
        },
        {
          userId: 9,
          type: "morning",
          date: "2020-11-09"
        },
        {
          userId: 3,
          type: "afternoon",
          date: "2020-11-09"
        },
        {
          userId: 10,
          type: "morning",
          date: "2020-11-10"
        },
        {
          userId: 1,
          type: "afternoon",
          date: "2020-11-10"
        }
      ]
    },
    {
      rotaID: 12,
      period: {
        startDate: "2020-11-11",
        endDate: "2020-11-20"
      },
      rota: [
        {
          userId: 10,
          type: "morning",
          date: "2020-11-11"
        },
        {
          userId: 1,
          type: "afternoon",
          date: "2020-11-11"
        },
        {
          userId: 9,
          type: "morning",
          date: "2020-11-12"
        },
        {
          userId: 2,
          type: "afternoon",
          date: "2020-11-12"
        },
        {
          userId: 8,
          type: "morning",
          date: "2020-11-13"
        },
        {
          userId: 3,
          type: "afternoon",
          date: "2020-11-13"
        },
        {
          userId: 7,
          type: "morning",
          date: "2020-11-14"
        },
        {
          userId: 5,
          type: "afternoon",
          date: "2020-11-14"
        },
        {
          userId: 6,
          type: "morning",
          date: "2020-11-15"
        },
        {
          userId: 4,
          type: "afternoon",
          date: "2020-11-15"
        },
        {
          userId: 5,
          type: "morning",
          date: "2020-11-16"
        },
        {
          userId: 7,
          type: "afternoon",
          date: "2020-11-16"
        },
        {
          userId: 4,
          type: "morning",
          date: "2020-11-17"
        },
        {
          userId: 6,
          type: "afternoon",
          date: "2020-11-17"
        },
        {
          userId: 3,
          type: "morning",
          date: "2020-11-18"
        },
        {
          userId: 8,
          type: "afternoon",
          date: "2020-11-18"
        },
        {
          userId: 2,
          type: "morning",
          date: "2020-11-19"
        },
        {
          userId: 9,
          type: "afternoon",
          date: "2020-11-19"
        },
        {
          userId: 1,
          type: "morning",
          date: "2020-11-20"
        },
        {
          userId: 10,
          type: "afternoon",
          date: "2020-11-20"
        }
      ]
    }
  ].map(rotas => new Rotas(rotas))
}
