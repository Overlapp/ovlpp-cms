import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { addDoc, collection, doc, Timestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { useFirestore } from 'reactfire';
import Main from './Main';


export default function Page() {
	const firestore = useFirestore();

	const [title, setTitle] = useState('')
	const [about, setAbout] = useState('')
	const [imgUrl, setImgUrl] = useState('')
	const [category, setCategory] = useState('default')

	const onOptionChange = (e: any) => {
		setCategory(e.target.value)
	}

	const handleCancel = () => {
		setTitle('')
		setAbout('')
		setImgUrl('')
		setCategory('default')
	}

	const handleSave = async () => {

		if (title && about && imgUrl && category !== 'default') {
			// post to firebase
			const docRef = await addDoc(collection(firestore, "posts"), {
				title,
				about,
				imgUrl,
				category,
				createdAt: Timestamp.now(),
				createdBy: 'overlapp'
			});
			toast.success('Item added successfully')
			console.log('post to firebase', docRef.id)
			handleCancel()
		}
	}

	const handleSubmit = (e: any) => {
		e.preventDefault()
		handleSave()
	}

	return (
		<Main>
			<div className="space-y-10 divide-y divide-gray-900/10">
				<div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
					<div className="px-4 sm:px-0">
						<h2 className="text-base/7 font-semibold dark:text-gray-50 text-gray-900">Add Item</h2>
						<p className="mt-1 text-sm/6 dark:text-gray-50 text-gray-600">
							This information will be displayed publicly for all users so be careful what you add :).
						</p>
					</div>

					<form onSubmit={handleSubmit} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
						<div className="px-4 py-6 sm:p-8">
							<div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
								<div className="sm:col-span-4">
									<label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
										Title
									</label>
									<div className="mt-2">
										<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
											{/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">http://</span> */}
											<input
												id="title"
												name="title"
												type="text"
												placeholder="Chess"
												value={title}
												onChange={(e) => setTitle(e.target.value)}
												className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
											/>
										</div>
									</div>
								</div>

								<div className="col-span-full">
									<label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
										About
									</label>
									<div className="mt-2">
										<textarea
											id="about"
											name="about"
											rows={3}
											onChange={(e) => setAbout(e.target.value)}
											value={about}
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
											defaultValue={''}
										/>
									</div>
									<p className="mt-3 text-sm/6 text-gray-600">Write a few sentences about the item.</p>
								</div>


								<div className="col-span-full">
									<label htmlFor="category" className="block text-sm/6 font-medium text-gray-900">
										Select Category
									</label>
									<div className="mt-2">
										<select name='category' id='category' value={category} onChange={onOptionChange} className="select select-primary w-full max-w-xs">
											<option value='default' disabled>What is the category?</option>
											<option value='concerts'>Concerts</option>
											<option value="movies">Movies</option>
											<option value="restaurant">Restaurant</option>
											<option value="sports">Sports</option>
											<option value="activities">Activities</option>
											<option value="others">Others</option>
										</select>
									</div>

								</div>

								{/* <div className="col-span-full">
								<label htmlFor="photo" className="block text-sm/6 font-medium text-gray-900">
									Photo
								</label>
								<div className="mt-2 flex items-center gap-x-3">
									<UserCircleIcon aria-hidden="true" className="h-12 w-12 text-gray-300" />
									<button
										type="button"
										className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
									>
										Change
									</button>
								</div>
							</div> */}

								<div className="sm:col-span-4">
									<label htmlFor="imgUrl" className="block text-sm/6 font-medium text-gray-900">
										Image URL
									</label>
									<div className="mt-2">
										<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
											<span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">https://</span>
											<input
												id="imgUrl"
												name="imgurl"
												type="text"
												placeholder="example.com/image.jpg"
												value={imgUrl}
												onChange={(e) => setImgUrl('https://' + e.target.value)}
												className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
											/>
										</div>
									</div>
								</div>

								{/* <div className="col-span-full">
								<label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
									Cover photo
								</label>
								<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
									<div className="text-center">
										<PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
										<div className="mt-4 flex text-sm/6 text-gray-600">
											<label
												htmlFor="file-upload"
												className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
											>
												<span>Upload a file</span>
												<input id="file-upload" name="file-upload" type="file" className="sr-only" />
											</label>
											<p className="pl-1">or drag and drop</p>
										</div>
										<p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
									</div>
								</div>
							</div> */}
							</div>
						</div>
						<div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
							<button onClick={handleCancel} type="button" className="text-sm/6 font-semibold text-gray-900">
								Cancel
							</button>
							<button
								type="submit"
								className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Save
							</button>
						</div>
					</form>
				</div>
			</div>
		</Main>
	)
}
