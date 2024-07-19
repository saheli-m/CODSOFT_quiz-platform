import React from 'react';
import { useLocation } from 'react-router-dom';

const QuizResultPage = () => {
    const { state } = useLocation();
    const { score, totalQuestions } = state;
    const percentile = ((score / totalQuestions) * 100).toFixed(2);

    const shareOnTwitter = () => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(`I scored ${score}/${totalQuestions} (${percentile}%) on this quiz!`);
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    };

    const shareOnFacebook = () => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(`I scored ${score}/${totalQuestions} (${percentile}%) on this quiz!`);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
    };

    const shareOnWhatsApp = () => {
        const text = encodeURIComponent(`I scored ${score}/${totalQuestions} (${percentile}%) on this quiz!`);
        window.open(`https://wa.me/?text=${text}`, '_blank');
    };

    const shareOnLinkedIn = () => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(`I scored ${score}/${totalQuestions} (${percentile}%) on this quiz!`);
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`, '_blank');
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="card col-md-6 shadow-sm p-4 rounded bg-warning-subtle">
                    <h2 className="text-center card-header pb-3 mb-3">Quiz Result</h2>
                    <p className="text-center fs-4 fw-semibold">Your score: {score}/{totalQuestions}</p>
                    <p className="text-center fs-4 fw-medium">Percentile: {percentile}%</p>

                    <div className="d-flex align-items-center justify-content-center mt-4 pt-3">
                        <p className='fw-bold mb-0'>Share on:</p>
                        <button className="btn btn-dark ms-3" onClick={shareOnTwitter}>
                            <i className="fa-brands fa-x-twitter"></i>
                        </button>                        
                        <button className="btn btn-dark ms-3" onClick={shareOnLinkedIn}>
                            <i className="fa-brands fa-linkedin-in"></i>
                        </button>
                        <button className="btn btn-dark ms-3" onClick={shareOnFacebook}>
                            <i className="fa-brands fa-facebook-f"></i>
                        </button>
                        <button className="btn btn-dark ms-3" onClick={shareOnWhatsApp}>
                            <i className="fa-brands fa-whatsapp"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizResultPage;

// import React from 'react';
// import { useLocation } from 'react-router-dom';

// const QuizResultPage = () => {
//     const { state } = useLocation();
//     const { score, totalQuestions } = state;
//     const percentile = ((score / totalQuestions) * 100).toFixed(2);

//     const shareOnTwitter = () => {
//         const url = encodeURIComponent(window.location.href);
//         const text = encodeURIComponent(`I scored ${score}/${totalQuestions} (${percentile}%) on this quiz!`);
//         window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
//     };

//     const shareOnFacebook = () => {
//         const url = encodeURIComponent(window.location.href);
//         const text = encodeURIComponent(`I scored ${score}/${totalQuestions} (${percentile}%) on this quiz!`);
//         window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
//     };

//     return (
//       <div className="container mt-5">
//         <div className="row justify-content-center">
//           <div className="col-md-6 shadow-sm p-4 rounded bg-warning-subtle">
//             <h2 className="text-center">Quiz Result</h2>
//             <p className="text-center">Your score: {score}/{totalQuestions}</p>
//             <p className="text-center">Percentile: {percentile}%</p>

//             <div className="d-flex align-items-center justify-content-center mt-4">
//               <p className='fw-bold mb-0'>Share on:</p>
//               <button className="btn btn-dark ms-3 me-3" onClick={shareOnTwitter}>
//                 <i class="fa-brands fa-x-twitter"></i>
//               </button>
//               <button className="btn btn-dark" onClick={shareOnFacebook}>
//                 <i class="fa-brands fa-facebook-f"></i>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
// };

// export default QuizResultPage;


        // <div>
        //     <h1>Quiz Result</h1>
        //     <p>Your score: {score}/{totalQuestions}</p>
        //     <p>Percentile: {percentile}%</p>
        //     <div>
        //         <button onClick={shareOnTwitter}>Share on Twitter</button>
        //         <button onClick={shareOnFacebook}>Share on Facebook</button>
        //     </div>
        // </div>
