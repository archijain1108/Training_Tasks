import { useState } from "react";
import Card from "./Card";

const Cards = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const [cardsData, setCardsData] = useState(() => {
    const data = localStorage.getItem('cardsData')
    return data ? JSON.parse(data) : []
  }
  );

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    // console.log(form.title , form.description)

    e.preventDefault();

    setCardsData([
      ...cardsData,
      { title: form.title, description: form.description },
    ]);

    // validate with formik + yup

    localStorage.setItem("cardsData", JSON.stringify(cardsData));

    setForm({
      title: "",
      description: "",
    });
  };

  //   const cards = [
  //     {
  //       title: "React.js",
  //       description:
  //         "A JavaScript library for building fast and interactive user interfaces.",
  //     },
  //     {
  //       title: "JavaScript",
  //       description:
  //         "A programming language used to create dynamic and interactive web applications.",
  //     },
  //     {
  //       title: "Node.js",
  //       description:
  //         "A JavaScript runtime used to build scalable backend applications and APIs.",
  //     },
  //     {
  //       title: "Express.js",
  //       description:
  //         "A lightweight Node.js framework for building web servers and REST APIs.",
  //     },
  //     {
  //       title: "MongoDB",
  //       description:
  //         "A NoSQL database that stores data in flexible JSON-like documents.",
  //     },
  //     {
  //       title: "PostgreSQL",
  //       description:
  //         "A powerful open-source relational database for storing and managing structured data.",
  //     },
  //     {
  //       title: "Docker",
  //       description:
  //         "A platform used to package applications and their dependencies into containers.",
  //     },
  //     {
  //       title: "Git",
  //       description:
  //         "A version control system used to track changes and collaborate on software projects.",
  //     },
  //   ];

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="border border-amber-800 rounded-lg flex flex-col items-center gap-3 w-sm p-10"
      >
        <input
          type="text"
          placeholder="Enter title"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="rounded-sm bg-black text-white w-full p-2 m-2"
        />

        <input
          type="text"
          placeholder="Enter description"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="p-2 rounded-sm bg-black text-white w-full"
        />

        <button className="p-4 rounded-lg text-white m-2">
          Submit
        </button>
      </form>

      <div className="flex gap-4">
        {cardsData.map((e, idx) => (
          <Card key={idx} title={e.title} description={e.description} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
