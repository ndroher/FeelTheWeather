const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-2xl z-50">
      <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin" />
    </div>
  );
};

export default Loading;
