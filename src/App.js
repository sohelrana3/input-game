import "./App.css";
import Headding from "./Layouts/Headding";
import {
    getDatabase,
    ref,
    set,
    push,
    onValue,
    remove,
    update,
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

    function openModal(item) {
        setIsOpen(true);
        seteditid(item.id);
        seteditinput(item.input);
        seteditpreposition(item.preposition);
        seteditprev(item.prev);
        setedittotal(item.total);
        setedittext(item.text);
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
    let [editid, seteditid] = useState("");
    let [upprev, setupprev] = useState(0);
    let [editinput, seteditinput] = useState()
    let [editpreposition, seteditpreposition] = useState()
    let [editprev, seteditprev] = useState()
    let [edittotal, setedittotal] = useState()
    let [edittext, setedittext] = useState()

    // creaate uesref
    let addref = useRef();
    let Divisionref = useRef();
    let Minusref = useRef();
    let Multiplicationref = useRef();

    useEffect(() => {
        // list
        const listref = ref(db, "input/");
        onValue(listref, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push({ ...item.val(), id: item.key });
            });
            setlist(arr);
        });
    }, []);

    useEffect(() => {
        list.map((item) => (setupprev(item.prev), settotal(item.total)));
    });

    // del button
    let handledel = (id) => {
        remove(ref(db, "input/" + id));
    };

    // update button
    let handleupdate = () => {
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
            update(ref(db, "input/" + editid), {
                preposition: "with",
                text: "Adding",
                prev: upprev,
                input: add,
                total: upprev + +add,
            });
            seterr("");
            addref.current.value = "";
        } else if (
            !addref.current.value &&
            !Minusref.current.value &&
            !Multiplicationref.current.value
        ) {
            if (Divisionref.current.value > total) {
                seterr("Please add input your number");
            } else {
                update(ref(db, "input/" + editid), {
                    preposition: "by",
                    text: "Dividing",
                    prev: total,
                    input: Division,
                    total: total / Division,
                });

                seterr("");
                Divisionref.current.value = "";
            }
        } else if (
            !addref.current.value &&
            !Divisionref.current.value &&
            !Multiplicationref.current.value
        ) {
            update(ref(db, "input/" + editid), {
                preposition: "from",
                text: "Subtracting",
                prev: total,
                input: Minus,
                total: total - Minus,
            });
            seterr("");
            Minusref.current.value = "";
        } else if (
            !addref.current.value &&
            !Divisionref.current.value &&
            !Minusref.current.value
        ) {
            if (Multiplicationref.current.value > total) {
                seterr("Please add input your number");
            } else {
                update(ref(db, "input/" + editid), {
                    preposition: "with",
                    text: "Multiplying",
                    prev: total,
                    input: Multiplication,
                    total: total * Multiplication,
                });

                Multiplicationref.current.value = "";
            }
        } else {
            seterr("Please give me one Inputbox data");
        }
        setIsOpen(false);
    };
    // handlle button
    let handlebutton = () => {
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
            set(push(ref(db, "input/")), {
                preposition: "with",
                text: "Adding",
                prev: total,
                input: add,
                total: total + +add,
            });
            addref.current.value = "";
        } else if (
            !addref.current.value &&
            !Minusref.current.value &&
            !Multiplicationref.current.value
        ) {
            if (Divisionref.current.value > total) {
                seterr("Please add input your number");
            } else {
                set(push(ref(db, "input/")), {
                    preposition: "by",
                    text: "Dividing",
                    prev: total,
                    input: Division,
                    total: total / Division,
                });

                seterr("");
                seterr("");
                Divisionref.current.value = "";
            }
        } else if (
            !addref.current.value &&
            !Divisionref.current.value &&
            !Multiplicationref.current.value
        ) {
            set(push(ref(db, "input/")), {
                preposition: "from",
                text: "Subtracting",
                prev: total,
                input: Minus,
                total: total - Minus,
            });
            seterr("");
            Minusref.current.value = "";
        } else if (
            !addref.current.value &&
            !Divisionref.current.value &&
            !Minusref.current.value
        ) {
            if (Multiplicationref.current.value > total) {
                seterr("Please add input your number");
            } else {
                set(push(ref(db, "input/")), {
                    preposition: "with",
                    text: "Multiplying",
                    prev: total,
                    input: Multiplication,
                    total: total * Multiplication,
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

                    {list.map((item, index) => (
                        <div className="flex justify-between">
                            <div className="w-[60%]">
                                <ol className="list-decimal">
                                    <li
                                        key={index}
                                        className="text-white font-medium text-base"
                                    >
                                        {item.text} {item.prev}{" "}
                                        {item.preposition} {item.input}. Total
                                        is = {item.total}
                                        {"  "}
                                    </li>
                                </ol>
                            </div>
                            <div className="w-[40%]">
                                <button
                                    className="border border-white text-red-500 px-4 text-base inline-block"
                                    onClick={(id) => handledel(item.id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="border border-white text-red-500 px-4 text-base"
                                    onClick={() => openModal(item)}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}

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
                                    <p className="mb-4"><span className="text-xl font-semibold">Editby :</span> {edittext} {editprev}{" "}
                                        {editpreposition} {editinput}. Total
                                        is = {edittotal}
                                        {"  "}</p>
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
                                    <div className="mb-5">
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
                                        onClick={handleupdate}
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
