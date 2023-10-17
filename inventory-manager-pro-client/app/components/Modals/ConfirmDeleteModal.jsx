import React from 'react'

const ConfirmDeleteModal = (id, handleFunc) => {
    return (
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn border-none btn border-none-sm btn border-none-circle btn border-none-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-l uppercase">Are you sure want to <span className='text-rose-500'>delete</span> the invoice?</h3>
                <div>
                    <div className="modal-action">
                        <form method="dialog">

                            <button className="btn border-none bg-green-500 text-white mr-2 hover:text-green-500" >Cancel</button>
                            <button className='btn border-none bg-rose-500 text-white hover:text-rose-500' onClick={() => handleFunc(id)}>Delete</button>
                        </form>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default ConfirmDeleteModal