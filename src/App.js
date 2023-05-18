import "./App.css";
import Headding from "./Layouts/Headding";
import {
    getDatabase,
    ref,
    set,
    push,
    onValue,
    remove,
} from "firebase/database";
import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";

function App() {
    const db = getDatabase();
    // modal
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };

    let hello;
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        hello.style.color = "#f00";
    }

    function closeModal() {
        setIsOpen(false);
    }

    // create Variable
    let [err, seterr] = useState("");
    let [add, setadd] = useState();
    let [Division, setDivision] = useState();
    let [Minus, setMinus] = useState();
    let [Multiplication, setMultiplication] = useState();
    let [total, settotal] = useState(0);
    let [list, setlist] = useState([]);

    // creaate uesref
    let addref = useRef();
    let Divisionref = useRef();
    let Minusref = useRef();
    let Multiplicationref = useRef();

    useEffect(() => {
        const starCountRef = ref(db, "input-counter/");
        onValue(starCountRef, (snapshot) => {
            snapshot.forEach((item) => {
                console.log(item.key, "=", item.val());
                settotal(item.val());
            });
        });

        // list
        const listref = ref(db, "List/");
        onValue(listref, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push({ ...item.val(), id: item.key });
            });
            setlist(arr);
        });
    }, []);

    // del button
    let handledel = (id) => {
        remove(ref(db, "List/" + id));
    };
   
    let handlebutton = () => {
        // data if funcion
        let data = total;
        if (
            !addref.current.value &&
            !Divisionref.current.value &&
            !Minusref.current.value &&
            !Multiplicationref.current.value
        ) {
            seterr("Please give me input box your data");
        } else if (
            !Divisionref.current.value &&
            !Minusref.current.value &&
            !Multiplicationref.current.value
        ) {
            let alldata = data + +add;
            settotal(alldata);
            seterr("");
            set(ref(db, "input-counter/"), {
                task: alldata,
            });
            set(push(ref(db, "List/")), {
                list: `${data} + ${add} = ${alldata}`,
            });
            addref.current.value = "";
        } else if (
            !addref.current.value &&
            !Minusref.current.value &&
            !Multiplicationref.current.value
        ) {
            if (Divisionref.current.value > data) {
                seterr("Please add input your number");
            } else {
                let alldata = data / Division;
                settotal(alldata);
                set(ref(db, "input-counter/"), {
                    task: alldata,
                });
                set(push(ref(db, "List/")), {
                    list: `${data} / ${Division} = ${alldata}`,
                });
                seterr("");
                Divisionref.current.value = "";
            }
        } else if (
            !addref.current.value &&
            !Divisionref.current.value &&
            !Multiplicationref.current.value
        ) {
            let alldata = data - Minus;
            settotal(alldata);
            set(ref(db, "input-counter/"), {
                task: alldata,
            });
            set(push(ref(db, "List/")), {
                list: `${data} - ${Minus} = ${alldata}`,
            });
            seterr("");
            Minusref.current.value = "";
        } else if (
            !addref.current.value &&
            !Divisionref.current.value &&
            !Minusref.current.value
        ) {
            if (Multiplicationref.current.value > data) {
                seterr("Please add input your number");
            } else {
                let alldata = data * Multiplication;
                settotal(alldata);
                set(ref(db, "input-counter/"), {
                    task: alldata,
                });
                set(push(ref(db, "List/")), {
                    list: `${data} * ${Multiplication} = ${alldata}`,
                });
                Multiplicationref.current.value = "";
            }
        } else {
            seterr("Please give me one Inputbox data");
        }
        setIsOpen(false);
    };
    return (
        <section className="bg-cyan-400 h-screen">
            <div className="container mx-auto flex py-40 h-screen">
                <div className="w-1/2 flex flex-col justify-between">
                    <div className="flex justify-between">
                        <div className="text-center">
                            <Headding title="Add" />
                            <input
                                ref={addref}
                                onChange={(e) => setadd(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={handlebutton}
                            className="bg-white px-6"
                        >
                            Button
                        </button>
                        <div className="text-center">
                            <Headding title="Division" />
                            <input
                                ref={Divisionref}
                                onChange={(e) => setDivision(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="text-center">
                            <h2 className="text-white font-extrabold text-4xl">
                                {total}
                            </h2>
                            <h3 className="text-white font-bold text-xl">
                                {err}
                            </h3>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="text-center">
                            <Headding title="Minus" />
                            <input
                                ref={Minusref}
                                onChange={(e) => setMinus(e.target.value)}
                            />
                        </div>
                        <div className="text-center">
                            <Headding title="Multiplication" />
                            <input
                                ref={Multiplicationref}
                                onChange={(e) =>
                                    setMultiplication(e.target.value)
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="w-1/2 pl-14">
                    <h2 className="text-center font-bold text-xl text-white mb-6">
                        List History
                    </h2>
                    <ol className="list-decimal">
                        {list.map((item, index) => (
                            <li
                                key={index}
                                className="text-white font-medium text-xl"
                            >
                                {item.list}{" "}
                                <button
                                    className="border border-white text-red-500 px-4 text-base"
                                    onClick={(id) => handledel(item.id)}
                                >
                                    Delet
                                </button>{" "}
                                <button
                                    className="border border-white text-red-500 px-4 text-base"
                                    onClick={openModal}
                                >
                                    Edit
                                </button>
                            </li>
                        ))}
                    </ol>

                    {/* modal */}
                    <div>
                        {/* <button onClick={openModal}>Open Modal</button> */}
                        <Modal
                            isOpen={modalIsOpen}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >
                            <div className="relative">
                                <h2 ref={(_subtitle) => (hello = _subtitle)}>
                                    Hello Shawon sir
                                </h2>
                                <button
                                    className="absolute top-0 right-0 border border-red-500 px-4"
                                    onClick={closeModal}
                                >
                                    close
                                </button>
                                <h2 className="text-center mb-3 text-2xl font-bold">
                                    Total: {total}
                                </h2>
                                <div>
                                    <div className="mb-5">
                                        <input
                                            ref={addref}
                                            onChange={(e) =>
                                                setadd(e.target.value)
                                            }
                                            className="border border-black mx-2"
                                            placeholder="Add  +"
                                        />
                                        <input
                                            ref={Divisionref}
                                            onChange={(e) =>
                                                setDivision(e.target.value)
                                            }
                                            className="border border-black mx-2"
                                            placeholder="Division  /"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            ref={Minusref}
                                            onChange={(e) =>
                                                setMinus(e.target.value)
                                            }
                                            className="border border-black mx-2"
                                            placeholder="Minus  -"
                                        />
                                        <input
                                            ref={Multiplicationref}
                                            onChange={(e) =>
                                                setMultiplication(
                                                    e.target.value
                                                )
                                            }
                                            className="border border-black mx-2"
                                            placeholder="Multiplication  *"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        onClick={handlebutton}
                                        className="w-full bg-[#22D3EE] mt-4 py-4 rounded-full"
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default App;
