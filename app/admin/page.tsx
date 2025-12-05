// "use client";

// import { useEffect, useState } from "react";
// import {
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   getDocs,
//   updateDoc,
// } from "firebase/firestore";
// import { db } from "@/firebase/firebase.config";
// import Image from "next/image";

// type Item = { id: string; inputText: string };

// export default function Home() {
//   const [inputText, setInputText] = useState("");
//   const [items, setItems] = useState<Item[]>([]);

//   // edit state
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [editingText, setEditingText] = useState("");

//   const fetchItems = async () => {
//     const querySnapshot = await getDocs(collection(db, "items"));
//     setItems(
//       querySnapshot.docs.map((docSnap) => ({
//         id: docSnap.id,
//         inputText: docSnap.data().inputText as string,
//       }))
//     );
//   };

//   const handleAddItem = async () => {
//     if (!inputText.trim()) return;
//     await addDoc(collection(db, "items"), { inputText });
//     setInputText("");
//     fetchItems();
//   };

//   const handleDelete = (id: string) => async () => {
//     if (!id) return;
//     await deleteDoc(doc(db, "items", id));
//     fetchItems();
//   };

//   // enter edit mode for a given item
//   const handleEdit = (item: Item) => () => {
//     setEditingId(item.id);
//     setEditingText(item.inputText);
//   };

//   // save edit and exit edit mode
//   const handleSaveEdit = async () => {
//     if (!editingId) return;
//     const ref = doc(db, "items", editingId);
//     await updateDoc(ref, { inputText: editingText });
//     setEditingId(null);
//     setEditingText("");
//     fetchItems();
//   };

//   // cancel edit without saving
//   const handleCancelEdit = () => {
//     setEditingId(null);
//     setEditingText("");
//   };

//   // handle Enter / Esc in edit input
//   const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       handleSaveEdit();
//     }
//     if (e.key === "Escape") {
//       e.preventDefault();
//       handleCancelEdit();
//     }
//   };

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   return (
//     <div className="flex flex-col gap-2 max-w-3xl m-auto">
//       <h1 className="mb-8">Next.js & Firebase - FlashStack Tutorial</h1>

//       <div className="flex gap-2">
//         <input
//           type="text"
//           className="border-2"
//           placeholder="add item"
//           value={inputText}
//           onChange={(e) => setInputText(e.target.value)}
//         />
//         <button className="border p-2" onClick={handleAddItem}>
//           Add
//         </button>
//       </div>

//       <ul className="w-96 border-t mt-4 pt-4 text-white space-y-2">
//         {items.map((item) => (
//           <li key={item.id}>
//             <div className="flex justify-between bg-emerald-600 pl-2">
//               {/* toggle between text and input */}
//               {editingId === item.id ? (
//                 <input
//                   className="flex-1 h-7 flex items-center text-black px-1"
//                   value={editingText}
//                   autoFocus
//                   onChange={(e) => setEditingText(e.target.value)}
//                   onBlur={handleSaveEdit}
//                   onKeyDown={handleEditKeyDown}
//                 />
//               ) : (
//                 <p className="flex-1 h-7 flex items-center">{item.inputText}</p>
//               )}

//               <div className="flex">
//                 {/* Edit toggle */}
//                 <button
//                   className="cursor-pointer h-7 w-7 bg-yellow-600 text-sm flex items-center justify-center"
//                   onClick={handleEdit(item)}
//                 >
//                   E
//                 </button>

//                 {/* Delete */}
//                 <button
//                   className="cursor-pointer h-7 w-7 bg-rose-600 text-sm flex items-center justify-center"
//                   onClick={handleDelete(item.id)}
//                 >
//                   X
//                 </button>
//               </div>
//             </div>

//             <div className="relative bg-purple-500 h-64">
//               <Image
//                 src="/image.png"
//                 alt="Picture of the author"
//                 fill
//                 // sizes="(min-width: 808px) 50vw, 100vw"
//                 style={{ objectFit: "cover" }}
//               />
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase.config";
import { Project } from "@/types/project";

const initialForm: Omit<Project, "id"> = {
  projectType: "",
  projectName: "",
  projectYear: "",
  region: "",
  city: "",
  country: "",
  totalArea: "",
  client: "",
  services: "",
  description: "",
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<Omit<Project, "id">>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const projectsRef = collection(db, "projects");

  const fetchProjects = async () => {
    const snapshot = await getDocs(projectsRef);
    const data: Project[] = snapshot.docs.map((d) => {
      const docData = d.data() as any;
      return {
        id: d.id,
        projectType: docData.projectType ?? "",
        projectName: docData.projectName ?? "",
        projectYear: docData.projectYear ?? "",
        region: docData.region ?? "",
        city: docData.city ?? "",
        country: docData.country ?? "",
        totalArea: docData.totalArea ?? "",
        client: docData.client ?? "",
        services: docData.services ?? "",
        description: docData.description ?? "",
      };
    });
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        const ref = doc(db, "projects", editingId);
        await updateDoc(ref, { ...form });
      } else {
        await addDoc(projectsRef, { ...form });
      }
      await fetchProjects();
      resetForm();
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setForm({
      projectType: project.projectType,
      projectName: project.projectName,
      projectYear: project.projectYear,
      region: project.region,
      city: project.city,
      country: project.country,
      totalArea: project.totalArea,
      client: project.client,
      services: project.services,
      description: project.description,
    });
  };

  const handleDelete = async (id: string) => {
    if (!id) return;
    await deleteDoc(doc(db, "projects", id));
    fetchProjects();
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Projects Admin</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded mb-10"
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">
            Proje Türü / Project Type
          </label>
          <input
            className="border px-2 py-1"
            name="projectType"
            value={form.projectType}
            onChange={handleChange}
            placeholder="CULTURAL"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">
            Proje Adı / Project Name
          </label>
          <input
            className="border px-2 py-1"
            name="projectName"
            value={form.projectName}
            onChange={handleChange}
            placeholder="URFA EDESSA MUSEUM"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">
            Proje Yılı / Project Year
          </label>
          <input
            className="border px-2 py-1"
            name="projectYear"
            value={form.projectYear}
            onChange={handleChange}
            placeholder="2017"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Bölge / Region</label>
          <input
            className="border px-2 py-1"
            name="region"
            value={form.region}
            onChange={handleChange}
            placeholder=""
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Şehir / City</label>
          <input
            className="border px-2 py-1"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="Şanlıurfa"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Ülke / Country</label>
          <input
            className="border px-2 py-1"
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="Türkiye"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">
            Toplam Alan / Total Area
          </label>
          <input
            className="border px-2 py-1"
            name="totalArea"
            value={form.totalArea}
            onChange={handleChange}
            placeholder="12300"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">İşveren / Client</label>
          <input
            className="border px-2 py-1"
            name="client"
            value={form.client}
            onChange={handleChange}
            placeholder="Ministry of Culture and Tourism"
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="text-sm font-medium">
            Hizmetlerimiz / Services
          </label>
          <textarea
            className="border px-2 py-1 min-h-[60px]"
            name="services"
            value={form.services}
            onChange={handleChange}
            placeholder='Architectural Design, "Architectural, Interior and Engineering Design - Project Management"'
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="text-sm font-medium">Açıklama / Description</label>
          <textarea
            className="border px-2 py-1 min-h-[100px]"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Project description..."
          />
        </div>

        <div className="md:col-span-2 flex gap-2 mt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 border bg-emerald-600 text-white text-sm"
          >
            {editingId
              ? loading
                ? "Saving..."
                : "Save Changes"
              : loading
              ? "Creating..."
              : "Create Project"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border text-sm"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* LIST */}
      <div className="border rounded">
        <div className="grid grid-cols-12 bg-gray-100 text-xs font-semibold px-2 py-2">
          <div className="col-span-1">Type</div>
          <div className="col-span-2">Name</div>
          <div className="col-span-1">Year</div>
          <div className="col-span-1">City</div>
          <div className="col-span-1">Country</div>
          <div className="col-span-1">Area</div>
          <div className="col-span-2">Client</div>
          <div className="col-span-2">Services</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {projects.map((p) => (
          <div
            key={p.id}
            className="grid grid-cols-12 border-t text-xs px-2 py-2 items-start"
          >
            <div className="col-span-1 truncate">{p.projectType}</div>
            <div className="col-span-2 truncate">{p.projectName}</div>
            <div className="col-span-1 truncate">{p.projectYear}</div>
            <div className="col-span-1 truncate">{p.city}</div>
            <div className="col-span-1 truncate">{p.country}</div>
            <div className="col-span-1 truncate">{p.totalArea}</div>
            <div className="col-span-2 truncate">{p.client}</div>
            <div className="col-span-2 truncate">{p.services}</div>
            <div className="col-span-1 flex justify-end gap-1">
              <button
                className="px-2 py-1 text-[10px] bg-yellow-500 text-white"
                onClick={() => handleEdit(p)}
              >
                Edit
              </button>
              <button
                className="px-2 py-1 text-[10px] bg-rose-600 text-white"
                onClick={() => handleDelete(p.id)}
              >
                Delete
              </button>
            </div>

            {/* Full description row */}
            {p.description && (
              <div className="col-span-12 text-[11px] text-gray-700 mt-1">
                {p.description}
              </div>
            )}
          </div>
        ))}

        {projects.length === 0 && (
          <div className="px-2 py-4 text-sm text-gray-500">
            No projects yet.
          </div>
        )}
      </div>
    </div>
  );
}
